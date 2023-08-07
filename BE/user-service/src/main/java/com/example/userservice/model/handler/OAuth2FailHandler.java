package com.example.userservice.model.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthorizationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
@Slf4j
public class OAuth2FailHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        log.info("여기는 Oauth2FailerHandler 이다. {} , - {}", exception.getMessage(), exception.getCause());
        if(exception instanceof OAuth2AuthenticationException){
            response.sendError(HttpStatus.NOT_ACCEPTABLE.value(), exception.getMessage());
        }
        else if(response instanceof  ServletException){
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value(), exception.getMessage());
        }
    }
}
