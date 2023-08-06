package com.example.userservice.model.handler;

import com.example.userservice.model.dto.TokenDto;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.util.TokenProvider;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.oauth2.sdk.TokenResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final RedisTemplate<String,String> redisTemplate;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        //TODO: 로그인 성공 이후의 Process
        //  - 최초의 로그인인지 check
        //  - Access/Refresh Token 생성 및 발급
        //  - Token 을 포함하여 리다이렉트
        log.info("OAuth Success!!");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String name = oAuth2User.getName();

        ValueOperations<String, String> opsForValue = redisTemplate.opsForValue();
        // TODO:
        //  - 토큰 발급 (AccessToken, RefreshToken)
        //  - 1. RefreshToken 이 존재하는 경우 (Redis)
        String redisRefresh = opsForValue.get(name);
        String refreshToken;
        String accessToken;
        if(redisRefresh != null){
            log.info("RefreshToken hit from redis");
            // refresh validation
            refreshToken = tokenProvider.refreshCheckExpire(redisRefresh, authentication);
            accessToken = tokenProvider.createToken(authentication);
        } else{
            refreshToken = tokenProvider.createRefreshToken(authentication);
            accessToken = tokenProvider.createToken(authentication);
        }
        opsForValue.set(name, refreshToken);



        PrintWriter writer = response.getWriter();
        response.setCharacterEncoding("utf-8");
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonStr = objectMapper.writeValueAsString(TokenDto.builder().accessToken(accessToken).refreshToken(refreshToken).build());
        writer.print(jsonStr);
        writer.flush();

        super.onAuthenticationSuccess(request, response, authentication);
    }

}
