package com.santa.projectservice.mongo;

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
    private Long inviter;
    private Date expire;
}
