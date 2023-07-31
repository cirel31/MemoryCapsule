package com.santa.board.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
public class ReviewResponseDTO {
    private String reviewTitle;
    private String reviewContent;
    private String reviewImgUrl;
    private int reviewHit;
    private int reviewLike;
    private Date reviewCreated;
    private String writerNickname;
    private boolean isLiked;

    public ReviewResponseDTO(String reviewTitle, String reviewContent, String reviewImgUrl, int reviewHit, int reviewLike, Date reviewCreated, String writerNickname, boolean isLiked) {
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.reviewImgUrl = reviewImgUrl;
        this.reviewHit = reviewHit;
        this.reviewLike = reviewLike;
        this.reviewCreated = reviewCreated;
        this.writerNickname = writerNickname;
        this.isLiked = isLiked;
    }
}
