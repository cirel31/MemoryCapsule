package com.santa.projectservice.jpa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.ws.rs.DefaultValue;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "article")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long article_idx;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "article_pjt_idx")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "article_creator_idx")
    private User user;

    @Column
    @NotNull
    private String article_content;
    @Column
    @CreationTimestamp
    private Timestamp article_created;

    @Column
    private Integer article_stamp;

    @JsonIgnore
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<ArticleImg> articleImgList = new ArrayList<>();


}
