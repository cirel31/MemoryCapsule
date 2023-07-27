package com.santa.projectservice.jpa;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@ToString
@Table(name = "article_img")
@NoArgsConstructor
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

}
