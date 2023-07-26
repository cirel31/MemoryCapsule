package com.santa.projectservice.dto;

import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Data
public class ProjectDto {
    private Long pjt_idx;
    private String pjt_title;
    private String pjt_content;
    private Date pjt_started;
    private Date pjt_ended;
    private Date pjt_created;
    private String pjt_imgurl;
    private String pjt_shareurl;
    private int pjt_type;
    private Boolean pjt_state;
    private String pjt_gift_url;
    private int pjt_limit;
    private Boolean pjt_deleted;
    private int pjt_alarm_type;
    private int pjt_alarm;
}
