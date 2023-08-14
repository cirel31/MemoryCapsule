package com.santa.projectservice.model.vo;

import lombok.Builder;
import lombok.Data;

@Data
public class UserVo {
    private String name;
    private String nickname;
    private String imgUrl;

    @Builder
    public UserVo(String name, String nickname, String imgUrl) {
        this.name = name;
        this.nickname = nickname;
        this.imgUrl = imgUrl;
    }
}
