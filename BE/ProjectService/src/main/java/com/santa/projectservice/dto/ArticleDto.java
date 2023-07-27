package com.santa.projectservice.dto;

import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.User;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ArticleDto {
    private Long idx;
    private Long projectId;
    private Long userId;
    private String content;
    private Timestamp created;
    private Integer stamp;
}
