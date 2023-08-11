package com.example.userservice.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
@Slf4j
public class RegexUtil {
    private final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";

    public boolean isEmail(final String email) {return Pattern.compile(EMAIL_REGEX).matcher(email).matches();}
}
