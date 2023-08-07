package com.example.userservice.model.handler;

import com.example.userservice.model.ErrorResponse;
import com.example.userservice.model.dto.TokenDto;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.util.TokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final RedisTemplate<String,String> redisTemplate;
    private final UserRepository userRepository;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        //TODO: 로그인 성공 이후의 Process
        //  - 최초의 로그인인지 check
        //  - Access/Refresh Token 생성 및 발급
        //  - Token 을 포함하여 리다이렉트
        log.info("OAuth Success!!");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String name = oAuth2User.getName();

        // 등록된 회원이지 check 후, 미가입자 회원가입처리
        Optional<User> byEmail = userRepository.findByEmail((String) oAuth2User.getAttribute("email"));
        User saved;
        if (byEmail == null) {
            // 회원가입 처리
            saved = userRepository.save(User.builder()
                    .nickName((String) oAuth2User.getAttribute("name"))
                    .email((String) oAuth2User.getAttribute("email"))
                    .passWord("")
                    .imgUrl((String) oAuth2User.getAttribute("picture"))
                    .oAuthUser(true)
                    .build());
        } else {
            saved = byEmail.get();
            if(!saved.isOAuthUser()) {
                String message = "이미 자체회원으로 가입한 유저입니다.";
                ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_ACCEPTABLE.name(), message);

                // to Json
                response.setStatus(HttpStatus.NOT_ACCEPTABLE.value());
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                writer.print(new ObjectMapper().writeValueAsString(errorResponse));
                writer.flush();

                // 리다이렉트 등 추가적이 필요하지 않은 경우, 핸들러 종료
                return;
            }
        }



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



        ObjectMapper objectMapper = new ObjectMapper();
        String jsonStr = objectMapper.writeValueAsString(
                UserDto.ResponseLogin.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .userIdx(saved.getIdx())
                                .build());
        writer.print(jsonStr);
        writer.flush();

        super.onAuthenticationSuccess(request, response, authentication);
    }

}
