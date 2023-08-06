package com.santa.board.Dto;

import com.santa.board.entity.Review;
import lombok.*;
import org.springframework.data.domain.Page;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
public class ReviewResponseDTO {
    private Long reviewIdx;
    private String reviewTitle;
    private String reviewContent;
    private String reviewImgUrl;
    private int reviewHit;
    private int reviewLike;
    private Date reviewCreated;
    private String writerNickname;
    private boolean isLiked;

    public ReviewResponseDTO(Long reviewIdx, String reviewTitle, String reviewContent, String reviewImgUrl, int reviewHit, int reviewLike, Date reviewCreated, String writerNickname, boolean isLiked) {
        this.reviewIdx = reviewIdx;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.reviewImgUrl = reviewImgUrl;
        this.reviewHit = reviewHit;
        this.reviewLike = reviewLike;
        this.reviewCreated = reviewCreated;
        this.writerNickname = writerNickname;
        this.isLiked = isLiked;
    }

    public ReviewResponseDTO() {

    }

    public Page<ReviewResponseDTO> toDtoList(Page<Review> reviewPage) {
        Page<ReviewResponseDTO> responseDTOPage = reviewPage.map(review -> ReviewResponseDTO.builder()
                .reviewIdx(review.getReviewIdx())
                .reviewTitle(review.getReviewTitle())
                .reviewContent(review.getReviewContent())
                .reviewImgUrl(review.getReviewImgUrl())
                .reviewHit(review.getReviewHit())
                .reviewLike(review.getReviewLike())
                .reviewCreated(review.getReviewCreated())
                .writerNickname(review.getUser().getUserName())
                .build());
        return responseDTOPage;
    }

    public ReviewResponseDTO toDto(Review review) {
        ReviewResponseDTO responseDTOPage = ReviewResponseDTO.builder()
                .reviewIdx(review.getReviewIdx())
                .reviewTitle(review.getReviewTitle())
                .reviewContent(review.getReviewContent())
                .reviewImgUrl(review.getReviewImgUrl())
                .reviewHit(review.getReviewHit())
                .reviewLike(review.getReviewLike())
                .reviewCreated(review.getReviewCreated())
                .writerNickname(review.getUser().getUserName())
                .isLiked(review.isLike())
                .build();
        return responseDTOPage;
    }
}
