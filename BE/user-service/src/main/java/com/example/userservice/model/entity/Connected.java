package com.example.userservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "connected")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Connected {
    @EmbeddedId
    private ConnectId connectId;


    @Column(name = "connected_confirm")
    private Boolean confirm;
}
