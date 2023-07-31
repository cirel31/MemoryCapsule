package com.example.userservice.controller;

import com.example.userservice.model.dto.LoginResponse;
import com.example.userservice.service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
@Slf4j
public class LoginController {
    private final OAuth2UserService oAuth2UserService;
    private final KakaoService kakaoService;


    @GetMapping("/test")
    public ResponseEntity getTest(@RequestParam("code") String code){
        log.info("Kako Test : {}", code);
        return ResponseEntity.status(HttpStatus.OK).body("코드 잘 받았음!");
    }

    @GetMapping("/oauth2/code/{provider}")
    public ResponseEntity getOauthLogin(
            @PathVariable String provider,
            @RequestParam String code
    ){
        log.info("Request Provider : {}", provider);
        kakaoService.getKakaoLogin(code);


        return ResponseEntity.status(HttpStatus.OK).body("goood 잘받아옴 " + code);
    }

}
