package com.example.userservice.model.dto;

import lombok.*;

public class FriendDto {
    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class basicFriendInfo{
        private Long idx;
        private String name;
        private String nickname;
        private String imgUrl;
        private Long totalWriteCnt;
        private Long totalInProjectCnt;
        private Long totalProjectCnt;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class showFriend{
        private Long userId;
        private String email;
        private String nickname;
        private String imgUrl;
        private int status;
    }

}
