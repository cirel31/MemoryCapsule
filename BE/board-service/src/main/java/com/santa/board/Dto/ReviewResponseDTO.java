package com.santa.board.Dto;

import com.santa.board.entity.Review;
import lombok.*;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
    private boolean isWriter;

    public ReviewResponseDTO(Long reviewIdx, String reviewTitle, String reviewContent, String reviewImgUrl, int reviewHit, int reviewLike, Date reviewCreated, String writerNickname, boolean isLiked, boolean isWriter) {
        this.reviewIdx = reviewIdx;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.reviewImgUrl = reviewImgUrl;
        this.reviewHit = reviewHit;
        this.reviewLike = reviewLike;
        this.reviewCreated = reviewCreated;
        this.writerNickname = writerNickname;
        this.isLiked = isLiked;
        this.isWriter = isWriter;
    }

    public ReviewResponseDTO() {

    }

    public List<ReviewResponseDTO> toDtoList(Page<Review> reviewPage) {
        return reviewPage.map(review -> ReviewResponseDTO.builder()
                .reviewIdx(review.getReviewIdx())
                .reviewTitle(review.getReviewTitle())
                .reviewContent(review.getReviewContent())
                .reviewImgUrl(review.getReviewImgUrl())
                .reviewHit(review.getReviewHit())
                .reviewLike(review.getReviewLike())
                .reviewCreated(review.getReviewCreated())
                .writerNickname(review.getUser().getUserName())
                .build()).stream().collect(Collectors.toList());
    }

    public ReviewResponseDTO toDto(Review review, boolean isLiked, boolean isWriter) {
        return ReviewResponseDTO.builder()
                .reviewIdx(review.getReviewIdx())
                .reviewTitle(review.getReviewTitle())
                .reviewContent(review.getReviewContent())
                .reviewImgUrl(review.getReviewImgUrl())
                .reviewHit(review.getReviewHit())
                .reviewLike(review.getReviewLike())
                .reviewCreated(review.getReviewCreated())
                .writerNickname(review.getUser().getUserName())
                .isLiked(isLiked)
                .isWriter(isWriter)
                .build();
    }
}
