package com.santa.projectservice.dto;

import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Data
public class ProjectDto {
    private Long idx;
    private String title;
    private String content;
    private Date started;
    private Date ended;
    private Date created;
    private String imgurl;
    private String shareurl;
    private int type;
    private Boolean state;
    private String gift_url;
    private int limit;
    private Boolean deleted;
    private int alarm_type;
    private int alarm;
}
