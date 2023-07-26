package com.santa.alarm.Entity;

import lombok.*;
import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "article")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_idx")
    private Long articleIdx;

    @ManyToOne
    @JoinColumn(name = "article_pjt_idx")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "article_creator_idx")
    private User articleCreator;

    @Column(name = "article_title")
    private String articleTitle;

    @Column(name = "article_content", columnDefinition = "VARCHAR(5000)")
    private String articleContent;

    @Column(name = "article_created")
    private Timestamp articleCreated;

    @Column(name = "article_updated")
    private Timestamp articleUpdated;

    @Column(name = "article_deleted")
    private Boolean articleDeleted;

    @Column(name = "article_stamp")
    private Integer articleStamp;
}