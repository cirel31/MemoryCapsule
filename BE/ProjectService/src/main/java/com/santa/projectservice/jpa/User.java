package com.santa.projectservice.jpa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ToString(exclude = {"registerList","projectList"})
@Entity
@Table(name = "user")
@Getter
@NoArgsConstructor
// 필드가 없는 클래스를 직렬화 하면서 문제가 생긴다함
// 디비에 데이터가 없어서 그런가?
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx")
    private Long id;

    @Column(name = "user_email", unique = true)
    private String email;
    @Column(name = "user_point")
    private int point;
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
    private int role;
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

    public User(Long userId){
        this.id = userId;
    }
}
