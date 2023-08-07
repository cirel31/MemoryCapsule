package com.santa.projectservice.dto;

import com.santa.projectservice.jpa.Article;
import lombok.Data;


@Data
public class ArticleImgDto {
    private Long imgIdx;
    private long articleId;
    private String imgurl;
}
