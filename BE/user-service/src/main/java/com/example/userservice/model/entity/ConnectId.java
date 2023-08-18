package com.example.userservice.model.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ConnectId implements Serializable {
    @Column(name = "connected_er")
    private Long requesterId;
    @Column(name = "connected_ee")
    private Long requesteeId;
}
