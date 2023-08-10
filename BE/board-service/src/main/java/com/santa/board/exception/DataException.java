package com.santa.board.exception;

public class DataException extends Exception {
    public DataException(String msg) {
        super(msg);
    }

    public DataException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
