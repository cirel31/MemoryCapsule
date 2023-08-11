package com.example.userservice.controller;

import com.example.userservice.model.dto.UserDto;
import com.example.userservice.service.UserService;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/signup")
    public ResponseEntity userSignup(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @ModelAttribute UserDto.SignUp signUpDto
        ){
        try{
            UserDto.Basic signup = userService.signup(signUpDto, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(signup);
        } catch (Exception e) {
            if(e instanceof IllegalStateException){
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/lock/health-check")
    public String lockedHealth() {
        return "Hello user-service with locked";
    }


    @Timed(description = "user.status", longTask = true)
    @GetMapping("/health-check")
    public String getHealth() {
        return "Hello user-service";
    }

    @PostMapping("/login")
    public ResponseEntity userLogin(@RequestBody UserDto.RequestLogin requestLogin) {
        log.info("user-login");
        try {
            UserDto.ResponseLogin result = userService.login(requestLogin);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/emailCheck")
    public ResponseEntity emailCheck(@RequestParam(value = "user_email") String user_email) {
        log.info("email-check");
        if (userService.emailCheck(user_email)) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("이미 존재하는 이메일입니다.");
        }
        String code = userService.generateRandomCode();
        ResponseEntity<String> response = new RestTemplate().postForEntity(
                "http://notification-service:8081/email/register_verify/" + user_email + "/" + code,
                null,
                String.class
        );
        if (response.getStatusCode().isError()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일 전송 실패");
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("회원가입 인증 코드: " + code);
    }

    @PostMapping("/logout")
    public ResponseEntity userLogout(HttpServletRequest request) {
        //
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/change")
    public ResponseEntity userChangeInfo(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @ModelAttribute UserDto.modify modifyDto) throws Exception {
        userService.modifyUser(modifyDto, file);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity userDelete(@RequestParam(value = "user_id") Long user_id) {
        try {
            userService.deleteUser(user_id);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            log.error("Error - userDelete : {}", e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일과 일치하는 유저가 없습니다.");
    }

    @GetMapping("/find_password")
    public ResponseEntity findPwd(@RequestBody UserDto.RequestFindPass userInfo) {

        if (userService.checkEmailDuplicated(userInfo)) {
            String tmp_pwd = userService.generateRandomCode();
            ResponseEntity<String> response = new RestTemplate().postForEntity(
                    "http://notification-service:8081/email/tmp_pwd/" + userInfo.getEmail() + "/" + tmp_pwd,
                    null,
                    String.class
            );
            if (response.getStatusCode().isError()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일 전송 실패");
            }
            userService.modifyPassword(userInfo.getEmail(), tmp_pwd);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("임시 비밀번호: " + tmp_pwd);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("이메일과 일치하는 유저가 없습니다.");
    }

    @GetMapping("/{userId}/detail")
    public ResponseEntity getUserDetail(
            @PathVariable("userId") Long userId,
            @RequestParam(value = "year", required = false, defaultValue = "0") int year,
            @RequestParam(value = "month", required = false, defaultValue = "0") int month
    ) {
        UserDto.Detail userDetail = null;
        try {
            userDetail = userService.getUserDetail(userId, year, month);
            return ResponseEntity.status(HttpStatus.OK).body(userDetail);
        } catch(Exception e){
            log.error("Error - userDetail : {}", e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/point/{userId}")
    public ResponseEntity getUserPoint(@PathVariable("userId") Long userId) {
        try {
            Long point = userService.getPoint(userId);
            return ResponseEntity.status(HttpStatus.OK).body(point);
        } catch (Exception e) {
            log.error("Error - getUserPoint : {}", e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PutMapping("/point/{userId}")
    public ResponseEntity updateUserPoint(
            @PathVariable("userId") Long userId,
            @RequestParam(value = "point") Long point) {
        try {
            if (userService.updatePoint(userId, point)) {
                return ResponseEntity.status(HttpStatus.OK).build();
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("포인트가 부족하여 사용이 불가능합니다.");
        } catch (Exception e) {
            log.error("Error - updateUserPoint : {}", e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}
