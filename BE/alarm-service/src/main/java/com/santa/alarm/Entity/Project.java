package com.santa.alarm.Entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
@Entity
@Table(name = "project")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pjt_idx")
    private Long pjtIdx;

    @Column(name = "pjt_title")
    private String pjtTitle;

    @Column(name = "pjt_content", columnDefinition = "VARCHAR(5000)")
    private String pjtContent;

    @Column(name = "pjt_started")
    private Timestamp pjtStarted;

    @Column(name = "pjt_ended")
    private Timestamp pjtEnded;

    @Column(name = "pjt_created")
    private Timestamp pjtCreated;

    @Column(name = "pjt_imgurl")
    private String pjtImgUrl;

    @Column(name = "pjt_shareurl")
    private String pjtShareUrl;

    @Column(name = "pjt_type")
    private Integer pjtType;

    @Column(name = "pjt_state")
    private Boolean pjtState;

    @Column(name = "pjt_gift_url")
    private String pjtGiftUrl;

    @Column(name = "pjt_limit")
    private Integer pjtLimit;

    @Column(name = "pjt_deleted")
    private Boolean pjtDeleted;

    @Column(name = "pjt_alarm_type")
    private Integer pjtAlarmType;

    @Column(name = "pjt_alarm")
    private Integer pjtAlarm;
}