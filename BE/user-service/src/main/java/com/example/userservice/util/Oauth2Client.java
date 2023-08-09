package com.example.userservice.util;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties(prefix = "oauth2.client.registration.kakao")
public class Oauth2Client {
    private String clientId;
    private String clientSecret;
    private String redirectUri;
    private String clientName;
    private String authorizationGrantType;
    private String authorizationUri;
    private String tokenUri;
    private String userInfoUri;
    private String userNameAttribute;
}
