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
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;


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
    public ResponseEntity userLogout() {
        return null;
    }

    @PutMapping("/change")
    public ResponseEntity userChangeInfo() {
        return null;
    }

    @DeleteMapping("/delete")
    public ResponseEntity userDelete() {
        return null;
    }

    @GetMapping("/find_id")
    public ResponseEntity findId() {
        return null;
    }

    @GetMapping("/find_password")
    public ResponseEntity findPwd() {
        return null;
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
