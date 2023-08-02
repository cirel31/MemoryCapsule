package com.santa.projectservice.jpa;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

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
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "article_created")
    @CreationTimestamp
    private Date created;

    @Builder
    public ArticleImg(Long id, Article article, String imgurl, Date created) {
        this.id = id;
        this.article = article;
        this.imgurl = imgurl;
        this.created = created;
    }
}
