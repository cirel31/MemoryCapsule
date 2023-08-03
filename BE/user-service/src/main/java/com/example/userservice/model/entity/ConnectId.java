package com.example.userservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class ConnectId implements Serializable {
    @Column(name = "connected_er")
    private Long requestor;
    @Column(name = "connected_ee")
    private String requestee;
}
