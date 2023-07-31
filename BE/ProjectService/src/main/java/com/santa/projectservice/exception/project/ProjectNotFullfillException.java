package com.santa.projectservice.exception.project;

import lombok.Data;
@Data
public class ProjectNotFullfillException extends RuntimeException {
    private String propertyName;

    public ProjectNotFullfillException(String message, Throwable cause, String propertyName) {
        super(message, cause);
        this.propertyName = propertyName;
    }

}
