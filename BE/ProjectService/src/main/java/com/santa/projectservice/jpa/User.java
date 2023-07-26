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

    @Column(unique = true)
    private String user_email;
    @Column
    private int user_point;
    @Column
    private String user_name;
    @Column
    private String user_nickname;
    @Column
    @NotNull
    private String user_pwd;
//    @Column
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date user_created;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date user_updated;
    @Column
    private Boolean user_deleted;
    @Column
    private int user_role;
    @Column(unique = true)
    @NotNull
    private String user_phone;
    @Column(length = 2048)
    private String user_imgurl;

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
