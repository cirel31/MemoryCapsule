package com.example.userservice.service;

import com.example.userservice.model.Enum.UserRole;
import com.example.userservice.model.dto.KakaoDto;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.util.Oauth2Client;
import com.example.userservice.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class Oauth2Service {
    private final Oauth2Client oauth2Client;
    private final UserRepository userRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final TokenProvider tokenProvider;

    public UserDto.ResponseLogin setKakao(String code) throws Exception {
        KakaoDto.KakaoTokenResponse token = getToken(code);
        KakaoDto.KakaoUserResponse userInfo = getUserInfo(token);

        //TODO 가입된 회원 체크
        log.debug("User 가입처리 Processing");
        Optional<User> byEmail = userRepository.findByEmail(userInfo.getKakaoAccount().getEmail());
        User user = null;
        if(!byEmail.isPresent()){
            user = userRepository.save(User.builder()
                    .name(userInfo.getProperties().getNickname())
                    .nickName("kakao-" + userInfo.getId())
                    .email(userInfo.getKakaoAccount().getEmail())
                    .point(0L)
                    .passWord("")
                    .imgUrl(userInfo.getKakaoAccount().getProfile().getProfileImageUrl())
                    .oAuthUser(true)
                    .createdAt(ZonedDateTime.now())
                    .updatedAt(ZonedDateTime.now())
                    .role(UserRole.USER)
                    .build());
        } else {
            user = byEmail.get();
            if(!user.isOAuthUser()) throw new IllegalStateException("자체 회원가입으로 등록된 유저입니다.");
        }

        //TODO AccessToekn/RefreshToekn 처리
        ValueOperations<String, String> opsForValue = redisTemplate.opsForValue();
        // TODO:
        //  - 토큰 발급 (AccessToken, RefreshToken)
        //  - 1. RefreshToken 이 존재하는 경우 (Redis)
        String redisRefresh = opsForValue.get(user.getIdx());
        String refreshToken;
        String accessToken;
        if (redisRefresh != null) {
            log.info("RefreshToken hit from redis");
            // refresh validation
            refreshToken = tokenProvider.refreshCheckExpire(redisRefresh, user.getIdx());
            accessToken = tokenProvider.createAccessToken(user.getIdx());
        } else {
            refreshToken = tokenProvider.createRefreshToken(user.getIdx());
            accessToken = tokenProvider.createAccessToken(user.getIdx());
        }
        opsForValue.set(String.valueOf(user.getIdx()), refreshToken);

        return UserDto.ResponseLogin.builder()
                .userIdx(user.getIdx())
                .refreshToken(refreshToken)
                .accessToken(accessToken)
                .build();
    }

    public KakaoDto.KakaoUserResponse getUserInfo(final KakaoDto.KakaoTokenResponse response){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.AUTHORIZATION, response.getAccess_token());
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        ResponseEntity<KakaoDto.KakaoUserResponse> kakaoUserResponseResponseEntity = restTemplate.postForEntity(
                oauth2Client.getUserInfoUri(),
                null,
                KakaoDto.KakaoUserResponse.class
        );
        return kakaoUserResponseResponseEntity.getBody();
    }


    public KakaoDto.KakaoTokenResponse getToken(String code){

        RestTemplate restTemplate = new RestTemplate();
        LinkedMultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", oauth2Client.getAuthorizationGrantType());
        parameters.add("client_id", oauth2Client.getClientId());
        parameters.add("redirect_uri", oauth2Client.getRedirectUri());
        parameters.add("code", code);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity entity = new HttpEntity<>(parameters, httpHeaders);
        ResponseEntity<KakaoDto.KakaoTokenResponse> result = restTemplate.postForEntity(
                oauth2Client.getTokenUri(),
                entity,
                KakaoDto.KakaoTokenResponse.class
        );

        return result.getBody();
    }


}
