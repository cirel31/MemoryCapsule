package com.santa.projectservice.model.vo;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ArticleVo {
    // 회원정보
    private UserVo userVo;
    //  게시글정보
    private String title;
    private String content;
    private Date created;
    private Integer stamp;
    private List<String> images;

    @Builder
    public ArticleVo(UserVo userVo, String title, String content, Date created, Integer stamp, List<String> images) {
        this.userVo = userVo;
        this.title = title;
        this.content = content;
        this.created = created;
        this.stamp = stamp;
        this.images = images;
    }
}
