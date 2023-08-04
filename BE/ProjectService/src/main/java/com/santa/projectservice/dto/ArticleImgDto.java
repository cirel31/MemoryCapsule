package com.santa.projectservice.dto;

import com.santa.projectservice.jpa.Article;
import lombok.Builder;
import lombok.Data;


@Data
public class ArticleImgDto {
    private Long imgIdx;
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
