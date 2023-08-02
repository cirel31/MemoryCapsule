package com.santa.projectservice.exception.project;

public class ProjectNotAuthorizedException extends RuntimeException{
    public ProjectNotAuthorizedException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProjectNotAuthorizedException(String message) {
        super(message);
    }
}
