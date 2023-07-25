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
@Table(name = "user")
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_idx;

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
    @Column
    @CreationTimestamp
    private Timestamp user_created;
    @Column
    @CreationTimestamp
    private Timestamp user_updated;
    @Column
    private Boolean user_deleted;
    @Column
    private int user_role;
    @Column(unique = true)
    @NotNull
    private String user_phone;
    @Column(length = 2048)
    private String user_imgurl;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Register> registerList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Article> articleList = new ArrayList<>();

}
