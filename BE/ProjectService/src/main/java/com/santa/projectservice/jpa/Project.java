package com.santa.projectservice.jpa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "project")
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pjt_idx;

    @Column(nullable = false)
    @NotNull
    private String pjt_title;

    @Column(nullable = false, length = 500)
    @NotNull
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
    @Column
    private Boolean pjt_state;
    @Column
    private String pjt_gift_url;
    @Column
    private int pjt_limit;
    @Column
    private Boolean pjt_deleted;
    @Column
    private int pjt_alarm_type;
    @Column
    private int pjt_alarm;

    @JsonIgnore
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Register> registerList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Article> articleList = new ArrayList<>();
}
