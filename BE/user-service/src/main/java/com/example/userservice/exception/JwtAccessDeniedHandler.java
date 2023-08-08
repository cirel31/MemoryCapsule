package com.example.userservice.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.debug("Exception: {}", accessDeniedException);
        log.debug("LocalizedMessage: {}", accessDeniedException.getLocalizedMessage());
        log.debug("message: {}", accessDeniedException.getMessage());
        log.debug("StackTrace: {}", accessDeniedException.getStackTrace());
        // 필요한 권한이 없이 접근하려 할때, 403
        response.sendError(HttpStatus.FORBIDDEN.value());
    }
}
