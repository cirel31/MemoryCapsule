package com.santa.projectservice.model.jpa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.santa.projectservice.model.dto.ProjectDto;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.ws.rs.DefaultValue;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@ToString(exclude = {"registerList","articleList"})
@Entity
@Getter
@Table(name = "project")
@DynamicInsert //insert 시 null 인필드 제외
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pjt_idx")
    private Long id;

    @Column(name = "pjt_title", nullable = false)
    @NotNull
    private String title;

    @Column(name = "pjt_content", nullable = false, length = 500)
    @NotNull
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "pjt_started")
    private Date started;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "pjt_ended")
    private Date ended;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "pjt_created")
    @CreationTimestamp
    private Date created;

    @Column(name = "pjt_imgurl", length = 2048)
    private String imgUrl;
    @Column(name = "pjt_shareurl", length = 2048)
    private String shareUrl;
    @Column(name = "pjt_type")
    private Integer type;
    @Column(name = "pjt_state")
    private Boolean state;
    @Column(name = "pjt_gift_url")
    private String giftUrl;
    @Column(name = "pjt_limit")
    private int limit;
    @Column(name = "pjt_deleted")
    @DefaultValue("false")
    private Boolean deleted;
    @Column(name = "pjt_alarm_type")
    private int alarmType;
    @Column(name = "pjt_alarm")
    private int alarm;

    @JsonIgnore
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Register> registerList = new ArrayList<>();

    @JsonIgnore
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Article> articleList = new ArrayList<>();

    @Builder
    public Project(Long id, String title, String content, Date started, Date ended, Date created, String imgUrl, String shareUrl, Integer type, Boolean state, String giftUrl, int limit, Boolean deleted, int alarmType, int alarm, List<Register> registerList, List<Article> articleList) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.started = started;
        this.ended = ended;
        this.created = created;
        this.imgUrl = imgUrl;
        this.shareUrl = shareUrl;
        this.type = type;
        this.state = state;
        this.giftUrl = giftUrl;
        this.limit = limit;
        this.deleted = deleted;
        this.alarmType = alarmType;
        this.alarm = alarm;
        this.registerList = registerList;
        this.articleList = articleList;
    }

    public ProjectDto toDto(){
        return ProjectDto.builder()
                .id(this.id)
                .title(this.title)
                .content(this.content)
                .started(this.started)
                .ended(this.ended)
                .created(this.created)
                .imgUrl(this.imgUrl)
                .shareUrl(this.shareUrl)
                .type(this.type)
                .state(this.state)
                .giftUrl(this.giftUrl)
                .limit(this.limit)
                .deleted(this.deleted)
                .alarmType(this.alarmType)
                .alarm(this.alarm)
                .build();
    }

    public void delete() {
        this.deleted = true;
    }
    public String finish() {
        this.state = true;
        this.giftUrl = UUID.randomUUID().toString().replaceAll("-", "");
        return this.giftUrl;
    }

    public void editComment(String content) {
        this.content = content;
    }
}
