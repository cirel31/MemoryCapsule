package com.santa.projectservice.model.vo;

import com.santa.projectservice.model.dto.ProjectDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
public class ProjectInfo {
    private Long idx;
    private String title;
    private String content;
    private Date started;
    private Date ended;
    private Date created;
    private String imgUrl;
    private String shareurl;
    private  String giftUrl;
    private int type;
    private Boolean state;
    private int limit;
    private int alarmType;
    private int alarm;
    private long artielcNum;

    @Builder
    public ProjectInfo(Long idx, String title, String content, Date started, Date ended, Date created, String imgUrl, String shareurl, int type, Boolean state, int limit, int alarmType, int alarm, long artielcNum) {
        this.idx = idx;
        this.title = title;
        this.content = content;
        this.started = started;
        this.ended = ended;
        this.created = created;
        this.imgUrl = imgUrl;
        this.shareurl = shareurl;
        this.type = type;
        this.state = state;
        this.limit = limit;
        this.alarmType = alarmType;
        this.alarm = alarm;
        this.artielcNum = artielcNum;
    }
    public ProjectInfo(ProjectDto projectDto, Long num){
        this.idx = projectDto.getId();
        this.title = projectDto.getTitle();
        this.content = projectDto.getContent();
        this.started = projectDto.getStarted();
        this.ended = projectDto.getEnded();
        this.created = projectDto.getCreated();
        this.imgUrl = projectDto.getImgUrl();
        this.shareurl = projectDto.getShareurl();
        this.type = projectDto.getType();
        this.state = projectDto.getState();
        this.limit = projectDto.getLimit();
        this.alarmType = projectDto.getAlarmType();
        this.alarm = projectDto.getAlarm();
        this.giftUrl = projectDto.getGiftUrl();
        this.artielcNum = num;
    }
}
