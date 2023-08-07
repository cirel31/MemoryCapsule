package com.example.userservice.model.entity;

import com.example.userservice.model.Enum.ProjectState;
import com.example.userservice.model.Enum.ProjectType;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "project")
@Getter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pjt_idx")
    private Long idx;

    @Column(name = "pjt_title")
    private String title;

    @Column(name = "pjt_content")
    private String content;

    @Column(name = "pjt_imgurl")
    private String imgUrl;

    @Column(name = "pjt_shareurl")
    private String shareUrl;        // 초대링크

    @Column(name = "pjt_gift_url")
    private String giftUrl;         // 최종산출물 url

    @Column(name = "pjt_type")
    @Enumerated(EnumType.ORDINAL)
    private ProjectType type;

    @Column(name = "pjt_state")
    @Enumerated(EnumType.ORDINAL)
    private ProjectState state;

    @Column(name = "pjt_limit")
    private Long limit;

    @Column(name = "pjt_deleted")
    private boolean deleted;

    @Column(name = "pjt_started")
    private LocalDateTime startedAt;

    @Column(name = "pjt_ended")
    private LocalDateTime endedAt;

    @Column(name = "pjt_created")
    private LocalDateTime createdAt;
}
