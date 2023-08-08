package com.example.userservice.service;

import com.example.userservice.model.Enum.UserRole;
import com.example.userservice.model.entity.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.util.OAuth2Attribute;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserRepository userRepository;

    /*
        정상적인 유저 인증이 완료되면 -> 여기로 오게됨, 이후에 Successhandler로 감
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        // TODO: ACCESS TOKEN 을 이용해 서드파티 서버로부터 사용자 정보를 받아온다.
        //  - 이미 회원가입 되어있는지 check
        //  - 비회원은 가입처리
        log.info("loadUser start!!");
        OAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = oAuth2UserService.loadUser(oAuth2UserRequest);
        String registrationId = oAuth2UserRequest.getClientRegistration().getRegistrationId(); // Kakao 인지 google인지 확인하는 코드
        String clientId = oAuth2UserRequest.getClientRegistration().getClientId();
        String userNameAttributeName = oAuth2UserRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        Map properties = (Map) oAuth2User.getAttribute("properties");

        OAuth2Attribute oAuth2Attribute = OAuth2Attribute.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        Map<String, Object> memberAttribute = oAuth2Attribute.convertToMap();
        log.info("UserParsing info - {}, {}, {}", String.valueOf(memberAttribute.get("name")), String.valueOf(memberAttribute.get("email")));
        Optional<User> byEmail = userRepository.findByEmail(String.valueOf(memberAttribute.get("email")));

        String nickname = "kakao-" + UUID.randomUUID().toString();

        if(!byEmail.isPresent()){
            User save = userRepository.save(User.builder()
                            .name(String.valueOf(memberAttribute.get("name")))
                            .nickName(nickname)
                    .email((String) memberAttribute.get("email"))
                            .point(0L)
                    .passWord("")
                    .imgUrl((String) memberAttribute.get("picture"))
                    .oAuthUser(true)
                            .createdAt(ZonedDateTime.now())
                            .updatedAt(ZonedDateTime.now())
                            .role(UserRole.USER)
                    .build());
            memberAttribute.put("userIdx", save.getIdx());
        } else if(!byEmail.get().isOAuthUser()) throw new OAuth2AuthenticationException("자체 회원가입으로 등록된 유저입니다.");
        else memberAttribute.put("userIdx", byEmail.get().getIdx());

        return new DefaultOAuth2User(
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")),
                memberAttribute, "email"
        );
    }

}
