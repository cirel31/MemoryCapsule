package com.santa.projectservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.santa.projectservice.jpa.Article;
import com.santa.projectservice.repository.ProjectRepository;
import com.santa.projectservice.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ArticleDto {
    @JsonIgnore
    private Long id;
    @JsonIgnore
    private Long projectId;
    private Long userId;
    private String title;
    private String content;
    private Date created;
    private Integer stamp;
    private List<String> images;
    @Builder
    public ArticleDto(Long id, Long projectId, Long userId, String title, String content, Date created, Integer stamp, List<String> images) {
        this.id = id;
        this.projectId = projectId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.created = created;
        this.stamp = stamp;
        this.images = images;
    }
}
