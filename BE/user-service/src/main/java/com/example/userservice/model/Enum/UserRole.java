package com.example.userservice.model.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserRole {
    USER("일반 사용자"),
    ADMIN("관리자");

    String description;
}
