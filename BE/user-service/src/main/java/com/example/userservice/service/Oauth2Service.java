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
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
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
        String redisRefresh = opsForValue.get(String.valueOf(user.getIdx()));
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

    public KakaoDto.KakaoUserResponse getUserInfo(final KakaoDto.KakaoTokenResponse response) throws Exception {
        log.info("getUserInfo start!");
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.AUTHORIZATION, "Bearer " + response.getAccess_token());
        MediaType mediaType = new MediaType(MediaType.APPLICATION_FORM_URLENCODED, StandardCharsets.UTF_8);
        httpHeaders.setContentType(mediaType);
        ResponseEntity<KakaoDto.KakaoUserResponse> kakaoUserResponseResponseEntity = null;
        log.info("kakao server send - getUserInfo");
        kakaoUserResponseResponseEntity = restTemplate.postForEntity(
                oauth2Client.getUserInfoUri(),
                new HttpEntity<>(httpHeaders),
                KakaoDto.KakaoUserResponse.class
        );
        log.info("kakao server received - getUserInfo");
        return kakaoUserResponseResponseEntity.getBody();
    }


    public KakaoDto.KakaoTokenResponse getToken(String code){
        log.info("getToken start");
        RestTemplate restTemplate = new RestTemplate();
        LinkedMultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", oauth2Client.getAuthorizationGrantType());
        parameters.add("client_id", oauth2Client.getClientId());
        parameters.add("redirect_uri", oauth2Client.getRedirectUri());
        parameters.add("code", code);

        HttpHeaders httpHeaders = new HttpHeaders();
        MediaType mediaType = new MediaType(MediaType.APPLICATION_FORM_URLENCODED, StandardCharsets.UTF_8);
        httpHeaders.setContentType(mediaType);
        HttpEntity entity = new HttpEntity<>(parameters, httpHeaders);
        log.info("kakao server send - getToken");
        ResponseEntity<KakaoDto.KakaoTokenResponse> result = restTemplate.postForEntity(
                oauth2Client.getTokenUri(),
                entity,
                KakaoDto.KakaoTokenResponse.class
        );
        log.info("kakao server received - getToken");
        return result.getBody();
    }


}
