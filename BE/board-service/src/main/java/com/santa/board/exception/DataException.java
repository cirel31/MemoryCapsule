package com.santa.board.exception;

import org.springframework.dao.DataAccessException;

public class DataException extends DataAccessException {
    public DataException(String msg) {
        super(msg);
    }

    public DataException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
