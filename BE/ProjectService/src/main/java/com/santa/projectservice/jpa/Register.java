package com.santa.projectservice.jpa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.ws.rs.DefaultValue;

@Data
@Entity
@Table(name = "register")
@NoArgsConstructor

public class Register {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long rgstr_idx;

    @JsonIgnore
    @JoinColumn(name = "rgstr_user_idx")
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
}
