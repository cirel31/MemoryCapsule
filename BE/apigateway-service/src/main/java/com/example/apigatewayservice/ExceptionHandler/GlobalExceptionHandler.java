package com.example.apigatewayservice.ExceptionHandler;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<Object> handleSomeException(Exception ex) {
        log.error("거부:", ex.getMessage());
        return new ResponseEntity<>("SomeException occurred: " + ex.getMessage(), HttpStatus.FORBIDDEN);
    }
}


