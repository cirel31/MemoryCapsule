package com.santa.projectservice.exception.register;

import java.sql.SQLException;

public class RegisterMakeException extends RuntimeException{
    public RegisterMakeException(String message, Throwable cause) {
        super(message, cause);
    }
}
