package com.santa.board.service;

import com.santa.board.Dto.ReviewForListResponseDTO;
import com.santa.board.Dto.ReviewRequestDTO;
import com.santa.board.Dto.ReviewResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    Page<ReviewForListResponseDTO> getReviewList(Pageable pageable);
    ReviewResponseDTO getReviewByReviewId(Long userIdx, Long reviewIdx);
    boolean insertReview(ReviewRequestDTO.InsertDto requestDTO, Long userIdx);
    boolean deleteReview(long reviewIdx);

    boolean modifyReviewById(ReviewRequestDTO.ModifyDto requestDTO);
    boolean likedReviewByReviewId(Long reviewIdx, Long userIdx);
    boolean unlikedReviewByReviewId(Long reviewIdx, Long userIdx);
}
