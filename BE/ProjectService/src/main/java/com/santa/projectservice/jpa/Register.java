package com.santa.projectservice.jpa;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.ws.rs.DefaultValue;


@Entity
@Table(name = "register")
@NoArgsConstructor
@Getter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Register {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long rgstr_idx;

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

    @Column
    @DefaultValue("0")
    private Boolean rgstr_type;
    @Column
    @DefaultValue("0")
    private Boolean rgstr_confirm;
    @Column
    @DefaultValue("0")
    private Boolean rgstr_alarm;

    public Register(User user, Project project, Boolean rgstr_type, Boolean rgstr_confirm, Boolean rgstr_alarm) {
        this.user = user;
        this.project = project;
        this.rgstr_type = rgstr_type;
        this.rgstr_confirm = rgstr_confirm;
        this.rgstr_alarm = rgstr_alarm;
    }
}
