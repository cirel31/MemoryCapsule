package com.example.userservice.service;

import com.example.userservice.model.dto.KakaoTokenResponse;
import com.example.userservice.model.dto.TokenDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.ws.rs.core.MultivaluedMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class KakaoService {
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String API_KEY;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String REDIRECT_URI;

    private String getToken(final String token){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.CONTENT_TYPE,  "application/x-www-form-urlencoded;charset=utf-8");

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", API_KEY);
        params.add("redirect_uri", REDIRECT_URI);
        params.add("code", token);

        HttpEntity<LinkedMultiValueMap<String, String>> kakaoTokenReq = new HttpEntity<>(params, httpHeaders);


        ResponseEntity<KakaoTokenResponse> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenReq,
                KakaoTokenResponse.class
        );

        KakaoTokenResponse tokenBody = response.getBody();
        log.info(String.valueOf(tokenBody));

        return "hihi";
    }

    public TokenDto getKakaoLogin(final String aToken){

        String token = getToken(aToken);

        return null;
    }


}
