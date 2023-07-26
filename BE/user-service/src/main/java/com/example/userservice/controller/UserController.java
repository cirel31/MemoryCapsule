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

    @PostMapping("/login")
    public ResponseEntity userLogin(@RequestBody UserDto.RequestLogin requestLogin){
        log.info("user-login");
        try{
            TokenDto result = userService.login(requestLogin);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity test(){
        return ResponseEntity.status(HttpStatus.OK).body("test success");
    }
}
