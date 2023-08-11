package com.santa.projectservice.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.santa.projectservice.model.vo.ProjectInfo;
import com.santa.projectservice.model.vo.UserVo;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDto {
    private Long id;
    private String title;
    private String content;
    private Date started;
    private Date ended;
    private Date created;
    private String imgUrl;
    private String shareUrl;
    private int type;
    private Boolean state;
    private String giftUrl;
    private int limit;
    private Boolean deleted;
    private int alarmType;
    private int alarm;
    @Builder
    public ProjectDto(Long id, String title, String content, Date started, Date ended, Date created, String imgUrl, String shareUrl, int type, Boolean state, String giftUrl, int limit, Boolean deleted, int alarmType, int alarm) {
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
        this.giftUrl = giftUrl;
        this.limit = limit;
        this.deleted = deleted;
        this.alarmType = alarmType;
        this.alarm = alarm;
    }


    public ProjectInfo toInfo(List<UserVo> userList, Long num){
        return new ProjectInfo(this,userList, num);
    }
}
