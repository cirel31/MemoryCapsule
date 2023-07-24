package com.santa.projectservice.jpa;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "article_img")
@NoArgsConstructor
public class ArticleImgEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleimg_img_idx;

    @Column @NotNull private Long articleimg_article_idx;
    @Column(length = 2048) private String articleimg_imgurl;
}
