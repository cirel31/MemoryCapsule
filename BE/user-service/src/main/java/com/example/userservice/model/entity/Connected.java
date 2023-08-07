package com.example.userservice.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "connected")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Connected {
    @EmbeddedId
    private ConnectId connectId;


    @Column(name = "connected_confirm")
    private Boolean confirm;
}
