package com.santa.board.entity;

import lombok.*;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "liked")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Liked {

    @EmbeddedId
    private LikedId id;
}
