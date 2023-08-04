package com.santa.projectservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArticleDto {
    @JsonIgnore
    private Long idx;
    @JsonIgnore
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
