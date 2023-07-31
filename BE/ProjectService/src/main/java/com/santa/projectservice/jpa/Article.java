package com.santa.projectservice.jpa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ToString(exclude = {"articleList"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Setter
@Table(name = "article")
@DynamicInsert
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_idx")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "article_pjt_idx")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "article_creator_idx")
    private User user;

    @Column(name = "article_title")
    private String title;
    @NotNull
    @Column(name = "article_content", length = 500)
    private String content;
    @Column(name = "article_created")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date created;

    @Column(name = "article_stamp")
    private Integer stamp;

    @JsonIgnore
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<ArticleImg> articleImgList = new ArrayList<>();

    @Builder
    public Article(Long id, Project project, User user,String title, String content, Date created, Integer stamp) {
        this.id = id;
        this.project = project;
        this.user = user;
        this.title = title;
        this.content = content;
        this.created = created;
        this.stamp = stamp;
    }
}
