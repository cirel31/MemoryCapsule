package com.example.userservice.model.entity;

import com.example.userservice.model.Enum.UserRole;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx")
    private Long idx;

    @Email
    @Column(name = "user_email", unique = true)
    private String email;

    @Column(name = "user_point")
    private Long point;
    @Column(name = "user_name")
    private String name;
    @Column(name = "user_nickname")
    private String nickName;

    @Column(name = "user_pwd")
    private String passWord;
    @Column(name = "user_created")
    private ZonedDateTime createdAt;
    @Column(name = "user_updated")
    private ZonedDateTime updatedAt;
    @Column(name = "user_deleted")
    private Boolean deleted;
    @Column(name = "user_role")
    @Enumerated(EnumType.ORDINAL)
    private UserRole role;
    @Column(name = "user_phone", unique = true, length = 10)
    private String phone;
    @Column(name = "user_imgurl", length = 2048)
    private String imgUrl;

    // User (1) : Access (N)
    // 주인 Access
    // ~주인 know Access
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
    List<Access> accessList = new ArrayList<>();


}
