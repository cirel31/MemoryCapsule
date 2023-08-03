package com.example.userservice.controller;

import com.example.userservice.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/friend")
@RestController
@Slf4j
@RequiredArgsConstructor
public class FriendController {
    private final UserService userService;

    @GetMapping("/test")
    public ResponseEntity test(
    ){
        userService.deleteFirend(1L, 3L);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
