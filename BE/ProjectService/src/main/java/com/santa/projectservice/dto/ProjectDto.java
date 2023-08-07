package com.santa.projectservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
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
    private String gifturl;
    private int limit;
    private Boolean deleted;
    private int alarm_type;
    private int alarm;

    @Builder
    public ProjectDto(Long idx, String title, String content, Date started, Date ended, Date created, String imgurl, String shareurl, int type, Boolean state, String gifturl, int limit, Boolean deleted, int alarm_type, int alarm) {
        this.idx = idx;
        this.title = title;
        this.content = content;
        this.started = started;
        this.ended = ended;
        this.created = created;
        this.imgurl = imgurl;
        this.shareurl = shareurl;
        this.type = type;
        this.state = state;
        this.gifturl = gifturl;
        this.limit = limit;
        this.deleted = deleted;
        this.alarm_type = alarm_type;
        this.alarm = alarm;
    }
}
