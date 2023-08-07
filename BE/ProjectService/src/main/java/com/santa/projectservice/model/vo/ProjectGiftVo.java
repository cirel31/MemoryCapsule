package com.santa.projectservice.model.vo;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ProjectGiftVo {
    private String title;
    private String content;
    private Date started;
    private Date ended;
    private String imgUrl;
    private String shareurl;
    private int type;
    private long artielcNum;
    private List<ArticleVo> articleVos;
    private List<UserVo> userVos;
    // 참여자 리스트, 만든사람 포함
    // 댓글에 이름하고 닉네임도 같이

    @Builder

    public ProjectGiftVo(String title, String content, Date started, Date ended, String imgUrl, String shareurl, int type, long artielcNum, List<ArticleVo> articleVos, List<UserVo> userVos) {
        this.title = title;
        this.content = content;
        this.started = started;
        this.ended = ended;
        this.imgUrl = imgUrl;
        this.shareurl = shareurl;
        this.type = type;
        this.artielcNum = artielcNum;
        this.articleVos = articleVos;
        this.userVos = userVos;
    }
}
