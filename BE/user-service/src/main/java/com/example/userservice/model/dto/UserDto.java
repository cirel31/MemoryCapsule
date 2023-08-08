package com.example.userservice.model.dto;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

public class UserDto {
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignUp{
        @Email
        private String email;
        @NotNull
        private String nickName;
        @NotNull
        private String name;
        @NotNull
        private String password;
        @Length(max = 11)
        private String phone;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class modify{
        @NotNull
        private Long userId;
        @NotNull
        private String nickName;
        @NotNull
        private String password;
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
    public static class RequestFindPass{
        private String email;
        private String phone;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResponseLogin{
        private Long userIdx;
        private String accessToken;
        private String refreshToken;
    }


    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Basic{
        private Long idx;
        private String email;
        private String nickname;
        private String name;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Detail{
        private Long userId;
        private String email;
        private String nickname;
		private String imgUrl;
        private int totalFriend;
        private boolean admin;
        private int point;
        private List<Date> accessList;
    }

}
