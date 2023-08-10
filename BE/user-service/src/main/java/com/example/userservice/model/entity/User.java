package com.example.userservice.model.entity;

import com.example.userservice.model.Enum.UserRole;
import com.example.userservice.model.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.WhereJoinTable;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString(exclude = {"accessList", "reqFriendList", "friendList", "projectList"})
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
    private boolean deleted;
    @Column(name = "user_role")
    @Enumerated(EnumType.ORDINAL)
    private UserRole role;
    @Column(name = "user_phone", length = 10)
    private String phone;
    @Column(name = "user_imgurl", length = 2048)
    private String imgUrl;
    @Column(name = "user_isoauth")
    private boolean oAuthUser;

    // 로그인 기록
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Access> accessList = new ArrayList<>();

    // 내가 친구신청을 한 목록
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "connected", joinColumns = {@JoinColumn(name = "connected_er", referencedColumnName = "user_idx", nullable = false)},
    inverseJoinColumns = {@JoinColumn(name = "connected_ee", referencedColumnName = "user_idx", nullable = false)})
    @WhereJoinTable (clause = "connected_confirm = '0'")
    @JsonIgnore
    private List<User> reqFriendList = new ArrayList<>();

    // 친구목록
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "connected", joinColumns = {@JoinColumn(name = "connected_er", referencedColumnName = "user_idx", nullable = false)},
            inverseJoinColumns = {@JoinColumn(name = "connected_ee", referencedColumnName = "user_idx", nullable = false)})
    @WhereJoinTable (clause = "connected_confirm = '1'")
    @JsonIgnore
    private List<User> friendList = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "connected", joinColumns = {@JoinColumn(name = "connected_er", referencedColumnName = "user_idx", nullable = false)},
            inverseJoinColumns = {@JoinColumn(name = "connected_ee", referencedColumnName = "user_idx", nullable = false)})
    @WhereJoinTable (clause = "connected_confirm = '0'")
    @JsonIgnore
    private List<User> comeRequestFriendList = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "connected", joinColumns = {@JoinColumn(name = "connected_ee", referencedColumnName = "user_idx", nullable = false)},
            inverseJoinColumns = {@JoinColumn(name = "connected_er", referencedColumnName = "user_idx", nullable = false)})
    @WhereJoinTable (clause = "connected_confirm = '0'")
    @JsonIgnore
    private List<User> sendRequestFriendList = new ArrayList<>();

    // 프로젝트 목록
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "register",
            joinColumns = {@JoinColumn(name = "rgstr_usr_idx", referencedColumnName = "user_idx", nullable = false)},
            inverseJoinColumns = {@JoinColumn(name = "rgstr_pjt_idx", referencedColumnName = "pjt_idx", nullable = false)}
    )
    @JsonIgnore
    private List<Project> projectList = new ArrayList<>();

    public void deleteUser() {
        this.deleted = true;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public void setPoint(Long point) {
        this.point = point;
    }

    public void modifyPassword(String code) {
        this.passWord = code;
    }

    public User newSignUpDtoToUser(UserDto.SignUp signUpDto, String imgUrl, String password) {
        return User.builder()
                .email(signUpDto.getEmail())
                .name(signUpDto.getName())
                .nickName(signUpDto.getNickName())
                .phone(signUpDto.getPhone())
                .point(0L)
                .role(UserRole.USER)
                .createdAt(ZonedDateTime.now())
                .updatedAt(ZonedDateTime.now())
                .imgUrl(imgUrl)
                .passWord(password)
                .build();
    }

    public void deletedSignUpDtoToUser(UserDto.SignUp signUpDto, String imgUrl, String password) {
        this.name = signUpDto.getName();
        this.nickName = signUpDto.getNickName();
        this.phone = signUpDto.getPhone();
        this.point = 0L;
        this.createdAt = ZonedDateTime.now();
        this.updatedAt = ZonedDateTime.now();
        this.imgUrl = imgUrl;
        this.passWord = password;
        this.deleted = false;
    }
}
