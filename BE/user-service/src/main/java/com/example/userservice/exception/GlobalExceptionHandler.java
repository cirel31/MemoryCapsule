package com.example.userservice.exception;

import com.example.userservice.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(OAuth2AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleOAuth2AuthenticationException(OAuth2AuthenticationException ex) {
        // 적절한 오류 메시지와 상태 코드를 설정하여 ErrorResponse 객체를 반환
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED.toString(), "Oauth2 인증 오류");
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
}
