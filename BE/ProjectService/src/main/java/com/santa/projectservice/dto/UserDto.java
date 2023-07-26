package com.santa.projectservice.dto;

import lombok.Data;

import java.sql.Timestamp;
@Data
public class UserDto {
    private Long user_idx;
    private String user_email;
    private int user_point;
    private String user_name;
    private String user_nickname;
    private String user_pwd;
    private Timestamp user_created;
    private Timestamp user_updated;
    private Timestamp user_deleted;
    private int user_role;
    private String user_phone;
    private String user_imgurl;
}
