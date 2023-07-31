package com.santa.projectservice.exception.User;

public class UserNotFoundException extends Exception{
    String message;
    public UserNotFoundException(String message) {
        this.message = message;
    }
}
