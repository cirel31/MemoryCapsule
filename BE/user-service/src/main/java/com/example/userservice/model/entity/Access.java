package com.example.userservice.model.entity;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "access")
public class Access {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "access_idx")
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "access_usr")
    private User user;

    @Column(name = "access_date")
    private ZonedDateTime accessedAt;
}
