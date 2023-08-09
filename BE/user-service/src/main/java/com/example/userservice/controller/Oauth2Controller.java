package com.example.userservice.controller;

import com.example.userservice.model.dto.UserDto;
import com.example.userservice.service.Oauth2Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
@Slf4j
@RequiredArgsConstructor
public class Oauth2Controller {
    private final Oauth2Service oauth2Service;

    @GetMapping("/kakao")
    public ResponseEntity getKakao(
            @RequestParam("code") String code
    ){
        try {
            UserDto.ResponseLogin responseLogin = oauth2Service.setKakao(code);
            return ResponseEntity.status(HttpStatus.OK).body(responseLogin);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
