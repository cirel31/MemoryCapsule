package com.santa.projectservice.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ArticleDto {
    private Long idx;
    private Long projectId;
    private Long userId;
    private String title;
    private String content;
    private Date created;
    private Integer stamp;
    private List<ArticleImgDto> images;

    @Builder
    public ArticleDto(Long idx, Long projectId, Long userId, String title, String content, Date created, Integer stamp, List<ArticleImgDto> images) {
        this.idx = idx;
        this.projectId = projectId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.created = created;
        this.stamp = stamp;
        this.images = images;
    }
}
