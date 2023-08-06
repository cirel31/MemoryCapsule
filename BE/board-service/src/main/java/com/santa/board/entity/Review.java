package com.santa.board.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "review")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_idx")
    private Long reviewIdx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_usr_idx")
    private User user;

    @Column(name = "review_title", nullable = false, length = 255)
    private String reviewTitle;

    @Column(name = "review_content", nullable = false, length = 5000)
    private String reviewContent;

    @Column(name = "review_imgurl", length = 2048)
    private String reviewImgUrl;

    @Column(name = "review_hit", nullable = false)
    private int reviewHit;

    @Column(name = "review_like", nullable = false)
    private int reviewLike;

    @Column(name = "review_deleted", nullable = false)
    private boolean reviewDeleted;

    @Column(name = "review_created", nullable = false, updatable = false)
    private Date reviewCreated;

    @Column(name = "review_updated", nullable = false)
    private Date reviewUpdated;

    @Transient
    private boolean isLike;
}

