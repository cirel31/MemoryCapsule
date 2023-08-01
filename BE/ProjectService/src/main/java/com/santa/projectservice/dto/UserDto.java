package com.santa.projectservice.dto;

import lombok.Data;

import java.sql.Timestamp;
@Data
public class UserDto {
    private Long id;
    private String email;
    private int point;
    private String name;
    private String nickname;
    private String pwd;
    private Timestamp created;
    private Timestamp updated;
    private Timestamp deleted;
    private int role;
    private String phone;
    private String imgurl;
}
