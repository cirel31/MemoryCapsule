package com.santa.board.Dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@ToString
public class ReviewForListResponseDTO {
    private String reviewTitle;
    private int reviewHit;
    private int reviewLike;
    private Date reviewCreated;
    private String writerNickname;

    public ReviewForListResponseDTO(String reviewTitle, int reviewHit, int reviewLike, Date reviewCreated, String writerNickname) {
        this.reviewTitle = reviewTitle;
        this.reviewHit = reviewHit;
        this.reviewLike = reviewLike;
        this.reviewCreated = reviewCreated;
        this.writerNickname = writerNickname;
    }
}
