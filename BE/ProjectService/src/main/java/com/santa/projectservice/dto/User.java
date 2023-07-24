package com.santa.projectservice.dto;

import com.sun.istack.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

public class User {
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
