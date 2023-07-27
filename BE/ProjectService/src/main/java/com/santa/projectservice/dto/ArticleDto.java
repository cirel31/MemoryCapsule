package com.santa.projectservice.dto;

import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.User;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ArticleDto {
    private Long idx;
    private Long projectId;
    private Long userId;
    private String title;
    private String content;
    private Timestamp created;
    private Integer stamp;

    @Builder
    public ArticleDto(Long idx, Long projectId, Long userId, String title, String content, Timestamp created, Integer stamp) {
        this.idx = idx;
        this.projectId = projectId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.created = created;
        this.stamp = stamp;
    }
}
