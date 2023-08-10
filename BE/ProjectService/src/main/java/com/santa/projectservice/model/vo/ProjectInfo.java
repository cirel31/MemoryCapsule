package com.santa.projectservice.model.vo;

import com.santa.projectservice.model.dto.ProjectDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
public class ProjectInfo {
    private Long id;
    private String title;
    private String content;
    private Date started;
    private Date ended;
    private Date created;
    private String imgUrl;
    private String shareUrl;
    private  String giftUrl;
    private int type;
    private Boolean state;
    private int limit;
    private int alarmType;
    private int alarm;
    private long artielcNum;

    @Builder
    public ProjectInfo(Long id, String title, String content, Date started, Date ended, Date created, String imgUrl, String shareUrl, int type, Boolean state, int limit, int alarmType, int alarm, long artielcNum) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.started = started;
        this.ended = ended;
        this.created = created;
        this.imgUrl = imgUrl;
        this.shareUrl = shareUrl;
        this.type = type;
        this.state = state;
        this.limit = limit;
        this.alarmType = alarmType;
        this.alarm = alarm;
        this.artielcNum = artielcNum;
    }
    public ProjectInfo(ProjectDto projectDto, Long num){
        this.id = projectDto.getId();
        this.title = projectDto.getTitle();
        this.content = projectDto.getContent();
        this.started = projectDto.getStarted();
        this.ended = projectDto.getEnded();
        this.created = projectDto.getCreated();
        this.imgUrl = projectDto.getImgUrl();
        this.shareUrl = projectDto.getShareUrl();
        this.type = projectDto.getType();
        this.state = projectDto.getState();
        this.limit = projectDto.getLimit();
        this.alarmType = projectDto.getAlarmType();
        this.alarm = projectDto.getAlarm();
        this.giftUrl = projectDto.getGiftUrl();
        this.artielcNum = num;
    }
}
