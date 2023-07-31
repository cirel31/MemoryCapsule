package com.example.userservice.model.handler;

import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.util.TokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final RedisTemplate<String,String> redisTemplate;
    private final UserRepository userRepository;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        //TODO: 로그인 성공 이후의 Process
        //  - 최초의 로그인인지 check
        //  - Access/Refresh Token 생성 및 발급
        //  - Token 을 포함하여 리다이렉트
        log.info("Auth Success!!");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String name = oAuth2User.getName();
        log.info("Principal 에서 꺼낸 OAuth2User = {}", name);

        // TODO:
        //  - 기존유저이면, Redis Check -> 토큰발행
        //  - 새로운유저이면, 회원가입 처리
        User user = userRepository.findByEmail(name);
        if(user == null){
            log.info("이 유저는 등록되지 않은 회원임!");
            String accessToken = tokenProvider.createToken(authentication);
            String refreshToken = tokenProvider.createRefreshToken(authentication);

            PrintWriter writer = response.getWriter();
            writer.print("abcdefg");
            writer.print("김재현 롤 개못함");
            writer.flush();
        }
        else{
            log.info("이 유저는 등록된 회원임!");


            PrintWriter writer = response.getWriter();
            writer.flush();
        }

        super.onAuthenticationSuccess(request, response, authentication);
    }


}
