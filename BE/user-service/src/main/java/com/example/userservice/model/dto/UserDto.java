package com.example.userservice.model.dto;

import jdk.jfr.SettingDefinition;
import lombok.*;

public class UserDto {
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignUp{
        private String email;
        private String nickName;
        private String passWord;
        private String phone;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RequestLogin{
        private String email;
        private String password;
    }
}
