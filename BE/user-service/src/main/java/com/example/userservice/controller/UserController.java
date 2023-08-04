package com.example.userservice.controller;

import com.example.userservice.model.dto.TokenDto;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.UserService;
import com.example.userservice.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 에러입니다. 관리자에게 문의해주세요");
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
            TokenDto result = userService.login(requestLogin);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
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
            return null;
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
