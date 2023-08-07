package com.santa.board.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "notice")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeIdx;

    private Long noticeCreatorIdx;
    private String noticeTitle;
    private String noticeContent;
    private String noticeImgurl;

    @Column(columnDefinition = "bit")
    private Boolean noticeDeleted;
    private Date noticeCreated;
    private Date noticeUpdated;
    private Integer noticeHit;


    // 필수 필드를 갖는 생성자
    public Notice(Long noticeCreatorIdx, String noticeTitle, String noticeContent) {
        this.noticeCreatorIdx = noticeCreatorIdx;
        this.noticeTitle = noticeTitle;
        this.noticeContent = noticeContent;
    }
    public void deleteNoticeDeleted() {
        this.noticeDeleted = true;
    }

    public void modifyNotice(String noticeTitle, String noticeContent, String noticeImgurl) {
        this.noticeTitle = noticeTitle;
        this.noticeContent = noticeContent;
        this.noticeImgurl = noticeImgurl;
        this.noticeUpdated = new Date();
    }

    public void incrementNoticeHit() {
        this.noticeHit += 1;
    }
}