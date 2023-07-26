package com.santa.alarm.exception;

public class EmailSendFailException extends RuntimeException{
    public EmailSendFailException() {
        super();
    }
    public EmailSendFailException(String message, Throwable cause) {
        super(message, cause);
    }
    public EmailSendFailException(String message) {
        super(message);
    }
    public EmailSendFailException(Throwable cause) {
        super(cause);
    }
}