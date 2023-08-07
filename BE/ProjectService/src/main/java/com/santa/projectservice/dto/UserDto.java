package com.santa.projectservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.santa.projectservice.jpa.User;
import com.santa.projectservice.vo.UserVo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@Data
@NoArgsConstructor
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
    @Builder
    public UserDto(Long id, String email, int point, String name, String nickname, String pwd, Timestamp created, Timestamp updated, Timestamp deleted, int role, String phone, String imgurl) {
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
    }

    public UserVo toVo(){
        return UserVo.builder()
                .imgurl(this.imgurl)
                .name(this.name)
                .nickname(this.nickname)
                .build();
    }
}
