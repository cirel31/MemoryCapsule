package com.santa.alarm.Entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx")
    private Long userIdx;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_point")
    private Integer userPoint;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_nickname")
    private String userNickname;

    @Column(name = "user_pwd")
    private String userPwd;

    @Column(name = "user_created")
    private Timestamp userCreated;

    @Column(name = "user_updated")
    private Timestamp userUpdated;

    @Column(name = "user_deleted")
    private Boolean userDeleted;

    @Column(name = "user_role")
    private Integer userRole;

    @Column(name = "user_phone")
    private String userPhone;

    @Column(name = "user_imgurl")
    private String userImgUrl;

    // Getter, Setter, Constructors, etc.
}
