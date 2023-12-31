package com.santa.projectservice.model.mongo;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Date;

@Document(collection = "santa")
@Data
public class Invite {
    @Id
    private String id;

    private Long userId;
    private Long projectId;
    private String inviter;
    private String projectTitle;
    //테스트
    private Date expire;
    @Builder
    public Invite(String id, Long userId, Long projectId, String inviter, String projectTitle, Date expire) {
        this.id = id;
        this.userId = userId;
        this.projectId = projectId;
        this.projectTitle = projectTitle;
        this.inviter = inviter;
        this.expire = expire;
    }
}
