package com.example.userservice.model.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        //TODO: 로그인 성공 이후의 Process
        //  - 최초의 로그인인지 check
        //  - Access/Refresh Token 생성 및 발급
        //  - Token 을 포함하여 리다이렉트

        OAuth2User principal = (OAuth2User) authentication.getPrincipal();
        super.onAuthenticationSuccess(request, response, authentication);
    }


}
