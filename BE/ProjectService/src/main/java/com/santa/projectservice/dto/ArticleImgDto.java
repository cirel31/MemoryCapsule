package com.santa.projectservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.santa.projectservice.jpa.Article;
import lombok.Builder;
import lombok.Data;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArticleImgDto {
    @JsonIgnore
    private Long imgIdx;
    @JsonIgnore
    private long articleId;
    private String imgurl;
    private int order;

    @Builder
    public ArticleImgDto(Long imgIdx, long articleId, String imgurl, int order) {
        this.imgIdx = imgIdx;
        this.articleId = articleId;
        this.imgurl = imgurl;
        this.order = order;
    }
}
