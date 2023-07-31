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
}