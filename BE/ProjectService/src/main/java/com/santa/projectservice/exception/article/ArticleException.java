package com.santa.projectservice.exception.article;

public class ArticleException extends Exception{
    public ArticleException(String message, Throwable cause) {
        super(message, cause);
    }

    public ArticleException(String message) {
        super(message);
    }
}

