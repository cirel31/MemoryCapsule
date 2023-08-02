package com.santa.board.service;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.ReviewResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    Page<ReviewResponseDTO> getReviewList(Pageable pageable);
    ReviewResponseDTO getReviewByReviewId(Long userIdx, Long reviewIdx);
    boolean insertReview(InsertDto insertDto, Long userIdx);
    boolean deleteReview(long reviewIdx);

    boolean modifyReviewById(ModifyDto modifyDto);
    boolean likedReviewByReviewId(Long reviewIdx, Long userIdx);
    boolean unlikedReviewByReviewId(Long reviewIdx, Long userIdx);
}
