package com.santa.alarm.Entity;

import lombok.*;
import javax.persistence.*;
@Entity
@Table(name = "register")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Register {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rgstr_idx")
    private Long rgstrIdx;

    @ManyToOne
    @JoinColumn(name = "rgstr_usr_idx")
    private User user;

    @ManyToOne
    @JoinColumn(name = "rgstr_pjt_idx")
    private Project project;

    @Column(name = "rgstr_type")
    private Boolean rgstrType;

    @Column(name = "rgstr_confirm")
    private Boolean rgstrConfirm;

    @Column(name = "rgstr_alarm")
    private Boolean rgstrAlarm;
}
