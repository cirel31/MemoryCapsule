package com.santa.projectservice.exception;

import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class S3ExceptionHandler {

    @ExceptionHandler(FileUploadException.class)
    public ResponseEntity<String> fileUploadException(FileUploadException e){
        log.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일을 올리는데 뭔가 에러가 났네요 : " + e.getMessage());
    }
}
