package com.santa.projectservice.jpa;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.ws.rs.DefaultValue;

@Data
@Entity
@Table(name = "register")
@NoArgsConstructor

public class RegisterEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long rgstr_idx;

    @Column @NotNull private long rgstr_usr_idx;
    @Column @NotNull private long rgstr_pjt_idx;
    @Column @DefaultValue("0") private Boolean rgstr_type;
    @Column @DefaultValue("0") private Boolean rgstr_confirm;
    @Column @DefaultValue("0") private Boolean rgstr_alarm;
}
