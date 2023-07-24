package com.santa.projectservice.jpa;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.ws.rs.DefaultValue;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Entity
@Table(name = "article")
public class ArticleEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long article_idx;

    @Column @NotNull private Long article_creator_idx;
    @Column @NotNull private Long article_pjt_idx;
    @Column @NotNull private String article_title;
    @Column @NotNull private String article_content;
    @Column @CreationTimestamp private Timestamp article_created;
    @Column @CreationTimestamp private Timestamp article_updated;
    @Column @DefaultValue("0") private Boolean article_deleted;
    @Column private Integer article_stamp;
}
