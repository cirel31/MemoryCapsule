package com.example.userservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ConnectId implements Serializable {
    @Column(name = "connected_er")
    private Long requesterId;
    @Column(name = "connected_ee")
    private Long requesteeId;
}
