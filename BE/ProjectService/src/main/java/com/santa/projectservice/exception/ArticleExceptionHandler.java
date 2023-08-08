package com.santa.projectservice.exception;

import com.santa.projectservice.exception.article.ArticleException;
import com.santa.projectservice.exception.article.ArticleProjectNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ArticleExceptionHandler {
    @ExceptionHandler(ArticleProjectNotFoundException.class)
    public ResponseEntity<String> articleNotFoundException(ArticleProjectNotFoundException e){
        log.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(ArticleException.class)
    public ResponseEntity<String> articleException(ArticleException e){
        log.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
