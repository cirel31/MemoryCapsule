package com.santa.projectservice.jpa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.ws.rs.DefaultValue;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ToString(exclude = {"registerList","articleList"})
@Entity
@Getter
@Table(name = "project")
@DynamicInsert //insert 시 null 인필드 제외
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
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
    private int type;
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

    public void delete() {
        this.deleted = true;
    }

    public void editComment(String content) {
        this.content = content;
    }

    @Builder
    public Project(Long id, String title, String content, Date started, Date ended, Date created, String imgurl, String shareurl, int type, Boolean state, String giftUrl, int limit, Boolean deleted, int alarmType, int alarm) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.started = started;
        this.ended = ended;
        this.created = created;
        this.imgUrl = imgurl;
        this.shareUrl = shareurl;
        this.type = type;
        this.state = state;
        this.giftUrl = giftUrl;
        this.limit = limit;
        this.deleted = deleted;
        this.alarmType = alarmType;
        this.alarm = alarm;
    }
}
