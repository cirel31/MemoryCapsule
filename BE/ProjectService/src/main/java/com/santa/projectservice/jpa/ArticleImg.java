package com.santa.projectservice.jpa;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@ToString
@Table(name = "article_img")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicInsert
public class ArticleImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "articleimg_img_idx")
    private Long id;
    @JoinColumn(name = "article_img_idx")
    @ManyToOne(fetch = FetchType.LAZY)
    private Article article;
    @Column(name = "articleimg_imgurl", length = 2048)
    private String imgurl;

    @Builder
    public ArticleImg(Long id, Article article, String imgurl) {
        this.id = id;
        this.article = article;
        this.imgurl = imgurl;
    }
}
