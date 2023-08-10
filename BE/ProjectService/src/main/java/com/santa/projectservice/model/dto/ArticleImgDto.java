package com.santa.projectservice.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArticleImgDto {
    @JsonIgnore
    private Long id;
    @JsonIgnore
    private long articleId;
    private String imgUrl;
    private int order;
    @Builder
    public ArticleImgDto(Long id, long articleId, String imgUrl, int order) {
        this.id = id;
        this.articleId = articleId;
        this.imgUrl = imgUrl;
        this.order = order;
    }
}
