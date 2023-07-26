package com.santa.projectservice.dto;

import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.User;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ArticleDto {
    private Long article_idx;
    private Project project;
    private User user;
    private String article_content;
    private Timestamp article_created;
    private Integer article_stamp;
}
