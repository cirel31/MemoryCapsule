package com.santa.projectservice.dto;

import com.santa.projectservice.jpa.Article;
import lombok.Data;


@Data
public class ArticleImgDto {
    private Long articleimg_img_idx;
    private Article article;
    private String articleimg_imgurl;
}
