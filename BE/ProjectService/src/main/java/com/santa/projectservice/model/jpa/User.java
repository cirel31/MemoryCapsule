package com.santa.projectservice.model.jpa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.santa.projectservice.model.vo.UserVo;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ToString(exclude = {"registerList","projectList"})
@Entity
@Table(name = "user")
@Getter
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx")
    private Long id;

    @Column(name = "user_email", unique = true)
    private String email;
    @Column(name = "user_point")
    private Integer point;
    @Column(name = "user_name")
    private String name;
    @Column(name = "user_nickname")
    private String nickname;
    @Column(name = "user_pwd")
    @NotNull
    private String pwd;
//    @Column
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "user_created")
    @CreationTimestamp
    private Date created;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "user_updated")
    @CreationTimestamp
    private Date updated;
    @Column(name = "user_deleted")
    private Boolean deleted;
    @Column(name = "user_role")
    private Integer role;
    @Column(name = "user_phone", unique = true)
    @NotNull
    private String phone;
    @Column(name = "user_imgurl", length = 2048)
    private String imgurl;

    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Register> registerList = new ArrayList<>();

    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Article> articleList = new ArrayList<>();
    @Builder
    public User(Long id, String email, Integer point, String name, String nickname, String pwd, Date created, Date updated, Boolean deleted, Integer role, String phone, String imgurl, List<Register> registerList, List<Article> articleList) {
        this.id = id;
        this.email = email;
        this.point = point;
        this.name = name;
        this.nickname = nickname;
        this.pwd = pwd;
        this.created = created;
        this.updated = updated;
        this.deleted = deleted;
        this.role = role;
        this.phone = phone;
        this.imgurl = imgurl;
        this.registerList = registerList;
        this.articleList = articleList;
    }
    public UserVo toVo(){
        return  UserVo.builder()
                .nickname(this.nickname)
                .name(this.name)
                .imgUrl(this.imgurl)
                .build();
    }

    public User(Long userId){
        this.id = userId;
    }
}
