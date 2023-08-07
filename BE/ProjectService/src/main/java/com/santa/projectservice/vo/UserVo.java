package com.santa.projectservice.vo;

import lombok.Builder;
import lombok.Data;

@Data
public class UserVo {
    private String name;
    private String nickname;
    private String imgurl;

    @Builder
    public UserVo(String name, String nickname, String imgurl) {
        this.name = name;
        this.nickname = nickname;
        this.imgurl = imgurl;
    }
}
