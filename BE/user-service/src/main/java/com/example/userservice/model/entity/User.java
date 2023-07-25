package com.example.userservice.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Email
    private String email;
    private Long point;
    private String name;
    private String nickName;
    
    private String passWord;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
    private Boolean deleted;
    private String phone;
    private String imgUrl;

}
