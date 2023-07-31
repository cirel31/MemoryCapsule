package com.santa.board.service;

import com.santa.board.Dto.ReviewForListResponseDTO;
import com.santa.board.Dto.ReviewRequestDTO;
import com.santa.board.Dto.ReviewResponseDTO;

import java.util.List;

public interface ReviewService {
    List<ReviewForListResponseDTO> getReviewList();
    ReviewResponseDTO getReviewByReviewId(Long userIdx, Long reviewIdx);
    boolean insertReview(ReviewRequestDTO requestDTO);
    boolean deleteReview(long reviewIdx);
    boolean modifyReviewById(ReviewRequestDTO requestDTO);
}
