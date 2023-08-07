package com.example.userservice.controller;

import com.example.userservice.model.dto.TokenDto;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/lock/health-check")
    public String lockedHealth() {
        return "Hello user-service with locked";
    }

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

    @PostMapping("/logout")
    public ResponseEntity userLogout(Authentication authentication) {
        userService.logout(authentication);
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
        userService.deleteUser(user_id);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/find_password")
    public ResponseEntity findPwd(@PathVariable("userEmail") String userEmail) throws Exception {
        if (userService.checkEmailDuplicated(userEmail)) {
            String code = userService.generateRandomPassword();
            ResponseEntity<String> response = new RestTemplate().postForEntity(
                    "http://notification-service:8081/email/register_verify/" + userEmail + "/" + code,
                    null,
                    String.class
            );
            if (response.getStatusCode().isError()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("이메일 전송 실패");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body("임시 비밀번호: " + code);
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

}
