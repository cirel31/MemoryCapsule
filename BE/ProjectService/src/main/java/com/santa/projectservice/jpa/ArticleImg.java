package com.santa.projectservice.jpa;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "article_img")
@NoArgsConstructor
public class ArticleImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleimg_img_idx;

    @JoinColumn(name = "article_img_idx")
    @ManyToOne(fetch = FetchType.LAZY)
    private Article article;


    @Column(length = 2048)
    private String articleimg_imgurl;


}
