package com.santa.projectservice.dto;

import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Data
public class ArticleDto {
    private Long idx;
    private Long projectId;
    private Long userId;
    private String title;
    private String content;
    private Date created;
    private Integer stamp;
    List<MultipartFile> images;

    @Builder
    public ArticleDto(Long idx, Long projectId, Long userId, String title, String content, Date created, Integer stamp, List<MultipartFile> images) {
        this.idx = idx;
        this.projectId = projectId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.created = created;
        this.stamp = stamp;
        this.images = images;
    }
}
