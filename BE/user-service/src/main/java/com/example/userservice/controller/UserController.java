package com.example.userservice.controller;

import com.amazonaws.services.kms.model.NotFoundException;
import com.example.userservice.model.ErrorResponse;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.User;
import com.example.userservice.service.UserService;
import com.example.userservice.util.RegexUtil;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.stream.Stream;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final RegexUtil regexUtil;


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
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/emailCheck")
    public ResponseEntity emailCheck(@RequestParam(value = "user_email") String user_email) {
        log.info("email-check");
        int status = userService.emailCheck(user_email);

        //TODO
        // - 1. 이메일 형식인지 check, 409
        // - 2. 이메일 존재하는데 탈퇴되지 않은회원 경우, NOT_ACCEPTABLE
        // -    이메일 존재하는데 탈퇴된 회원, 209

        // -    이메일 존재하지않는 경우 201
        if(!regexUtil.isEmail(user_email)) return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(HttpStatus.CONFLICT.name(), "Email 형식이 아닙니다."));


        try {
            String emailCode = userService.checkingUserOrSendEmail(user_email);
            return ResponseEntity.status(HttpStatus.CREATED).body(emailCode);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 전송 실패 입니다.");
        } catch (IllegalArgumentException e) {
            // 이미 회원이 가입한 경우 - 탈퇴되지 않은 회원인 경우
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new ErrorResponse(HttpStatus.NOT_ACCEPTABLE.name(), "'이미 회원이 가입된 이메일입니다."));
        } catch( NotFoundException e){
            return ResponseEntity.status(209).body(new ErrorResponse("Content Returned", "이미 탈퇴된 회원입니다."));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.name(), "내부 서버오류입니다. 관리자에게 문의하세요"));
        }
    }

    @PostMapping("/deletedEmailCheck")
    public ResponseEntity deletedEmailCheck(@RequestParam(value = "user_email") String user_email) {
        return getResponseEntity(user_email);
    }

    @NotNull
    private ResponseEntity getResponseEntity(String user_email) {
        String code = userService.generateRandomCode();
        ResponseEntity<String> response = new RestTemplate().postForEntity(
                "http://notification-service:8081/email/register_verify/" + user_email + "/" + code,
                null,
                String.class
        );
        if (response.getStatusCodeValue() != HttpStatus.OK.value()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일 전송 실패");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 인증 코드: " + code);
    }

    @PostMapping("/logout")
    public ResponseEntity userLogout(HttpServletRequest request) {
        Long userId = Long.valueOf(request.getHeader("userId").toString());
        userService.logout(userId);
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

    @PostMapping("/find_password")
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
                return ResponseEntity.status(HttpStatus.OK).body("성공");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("포인트가 부족하여 사용이 불가능합니다.");
        } catch (Exception e) {
            log.error("Error - updateUserPoint : {}", e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}
