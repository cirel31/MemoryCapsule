package com.santa.projectservice.exception;

import com.santa.projectservice.exception.User.UserNotFoundException;
import com.santa.projectservice.exception.project.ProjectException;
import com.santa.projectservice.exception.project.ProjectNotAuthorizedException;
import com.santa.projectservice.exception.project.ProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotFullfillException;
import com.santa.projectservice.exception.register.RegisterMakeException;
import com.santa.projectservice.exception.s3.FileUploadFailException;
import com.santa.projectservice.model.jpa.Project;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ProjectExceptionHandler {
    @ExceptionHandler(FileUploadFailException.class)
    public ResponseEntity<String> fileUploadFile(String errorMsg){
        log.error("FileUploadException: 뭔가 잘못되었습니다");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMsg);
    }
    @ExceptionHandler(RegisterMakeException.class)
    public ResponseEntity<String> registerException(RegisterMakeException e){
        log.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("프로젝트의 사용자들이 정상적이지 않습니다.\n프로젝트를 정상적으로 생성하지 못했습니다.");
    }
    @ExceptionHandler(ProjectNotAuthorizedException.class)
    public ResponseEntity<String> projectNotAuthorizedException(ProjectNotAuthorizedException e){
        log.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
    @ExceptionHandler(ProjectNotFoundException.class)
    public ResponseEntity<String> projectNotFoundException(ProjectNotFoundException e){
        log.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> userNotFoundException(UserNotFoundException e){
        log.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
    @ExceptionHandler(ProjectNotFullfillException.class)
    public ResponseEntity<String> projectNotFullfillException(ProjectNotFullfillException e){
        log.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage() + " 원인 : " + e.getPropertyName());
    }

    @ExceptionHandler(ProjectException.class)
    public ResponseEntity<String> projectException(ProjectException e){
        log.error(e.getMessage());
        log.error(e.getCause().toString());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

}
