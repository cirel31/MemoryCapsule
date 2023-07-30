package com.example.userservice.model.handler;

import org.springframework.security.oauth2.client.OAuth2AuthorizationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

public class OAuth2FailHandler extends SimpleUrlAuthenticationFailureHandler{

}
