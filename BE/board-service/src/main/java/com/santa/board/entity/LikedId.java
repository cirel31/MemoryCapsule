package com.santa.board.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class LikedId implements Serializable {

    @Column(name = "liked_review_idx")
    private Long likedReviewIdx;

    @Column(name = "liked_usr_idx")
    private Long likedUsrIdx;
}
