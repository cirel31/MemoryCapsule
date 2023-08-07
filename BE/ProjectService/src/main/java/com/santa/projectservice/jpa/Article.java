package com.santa.projectservice.jpa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.santa.projectservice.dto.ArticleDto;
import com.santa.projectservice.vo.ArticleVo;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@ToString(exclude = {"articleImgList", "user"})
@NoArgsConstructor
@Entity
@Getter
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
    public Article(Long id, Project project, User user, String title, String content, Date created, Integer stamp, List<ArticleImg> articleImgList) {
        this.id = id;
        this.project = project;
        this.user = user;
        this.title = title;
        this.content = content;
        this.created = created;
        this.stamp = stamp;
        this.articleImgList = articleImgList;
    }

    public ArticleDto toDto(){
        return ArticleDto.builder()
                .id(this.id)
                .projectId(this.project.getId())
                .userId(this.user.getId())
                .title(this.title)
                .content(this.content)
                .created(this.created)
                .stamp(this.stamp)
                .images(this.articleImgList.stream().map(ArticleImg::getImgurl).collect(Collectors.toList()))
                .build();
    }
    public ArticleVo toVo(){
        return ArticleVo.builder()
                .userVo(this.user.toVo())
                .title(this.title)
                .content(this.content)
                .created(this.created)
                .stamp(this.stamp)
                .images(this.articleImgList.stream().map(ArticleImg::getImgurl).collect(Collectors.toList()))
                .build();
    }
}
