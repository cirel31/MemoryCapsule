package com.santa.projectservice.exception.project;

public class ProjectNotFoundException extends Exception{
    public ProjectNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProjectNotFoundException(String message) {
        super(message);
    }
}
