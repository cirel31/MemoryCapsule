package com.example.userservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // TODO: ThirdParty 로부터 access Token 을 얻고 난 이후로 실행
        //  - 서버로부터 사용자 정보 얻기
        //  - 회원가입 되어있는지 여부 check -> 회원가입 되어있을 경우 프로필사진 URL 등의 정보를 업데이트
        //  - UserPrincipal 리턴

        // 객체의 성공정보를 바탕으로 만듦
        OAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
        // 생성된 Service 객체로부터 user정보 받기
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
        // 받은 user 정보로부터 user 정보를 받는다
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        log.info("registrationId = {}", registrationId);
        log.info("userNameAttributeName = {}", userNameAttributeName);

        return null;
    }
}
