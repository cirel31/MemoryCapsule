package com.santa.projectservice.jpa;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.santa.projectservice.dto.RegisterDto;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.ws.rs.DefaultValue;


@Entity
@Table(name = "register")
@NoArgsConstructor
@Getter
@ToString
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@DynamicInsert  // null값이 들어가있는 객체는 insert문에 포함시키지 않고 DB에 정의된 Default값 사용
                // 혹은 @PrePersist를 가진 함수 사용 ->  persist되기 전 실행됨
                // https://dotoridev.tistory.com/6
@DynamicUpdate
public class Register {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rgstr_idx")
    private long id;

    @JsonIgnore
    @JoinColumn(name = "rgstr_usr_idx")
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @JsonIgnore
    @JoinColumn(name = "rgstr_pjt_idx")
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

    @Column(name = "rgstr_type")
    @DefaultValue("0")
    private Boolean type;
    @Column(name = "rgstr_confirm")
    @DefaultValue("0")
    private Boolean confirm;
    @Column(name = "rgstr_alarm")
    @DefaultValue("0")
    private Boolean alarm;

    @Builder
    public Register(long id, User user, Project project, Boolean type, Boolean confirm, Boolean alarm) {
        this.id = id;
        this.user = user;
        this.project = project;
        this.type = type;
        this.confirm = confirm;
        this.alarm = alarm;
    }

    public RegisterDto toDto(){
        return RegisterDto.builder()
                .id(this.id)
                .userId(this.user.getId())
                .pjtId(this.project.getId())
                .type(this.type)
                .confirm(this.confirm)
                .alarm(this.alarm)
                .build();
    }


    public void confirm(){
        this.confirm = true;
    }


}
