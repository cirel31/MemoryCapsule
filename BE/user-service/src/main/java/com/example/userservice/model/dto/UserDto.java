package com.example.userservice.model.dto;

import com.example.userservice.model.entity.Access;
import jdk.jfr.SettingDefinition;
import lombok.*;

import java.util.Date;
import java.util.List;

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


    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Detail{
        private String email;
        private String nickname;
        private int totalFriend;
        private List<Date> accessList;
    }

}
