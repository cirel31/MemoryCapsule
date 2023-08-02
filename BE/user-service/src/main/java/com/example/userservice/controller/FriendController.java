package com.example.userservice.controller;

import com.example.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/friend")
@RestController
@Slf4j
@RequiredArgsConstructor
public class FriendController {
    private final UserService userService;



}
