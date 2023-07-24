package com.santa.projectservice.jpa;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
@Data
@Entity
@Table(name="project")
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pjt_idx;

    @Column(nullable = false)
    private String pjt_title;

    @Column(nullable = false, length = 500)
    private String pjt_content;

    @Column
    @CreationTimestamp
    private Timestamp pjt_started;
    @Column
    @CreationTimestamp
    private Timestamp pjt_ended;
    @Column
    @CreationTimestamp
    private Timestamp pjt_created;

    @Column(length = 2048)
    private String imgurl;
    @Column(length = 2048)
    private String pjt_shareurl;
    @Column
    private int pjt_type;
    @Column(length = 50)
    private String pjt_cron;
    @Column(columnDefinition = "TINYINT(4)")
    private Boolean pjt_state;
    @Column
    private String pjt_gift_url;
    @Column
    private int pjt_limit;
    @Column(columnDefinition = "TINYINT(4)")
    private Boolean pjt_deleted;
}
