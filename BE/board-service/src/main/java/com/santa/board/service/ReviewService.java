package com.santa.board.service;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.ReviewResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface ReviewService {
    Page<ReviewResponseDTO> getReviewList(Pageable pageable);
    ReviewResponseDTO getReviewByReviewId(Long userIdx, Long reviewIdx) throws Exception;
    boolean insertReview(InsertDto insertDto, Long userIdx, MultipartFile file) throws Exception;
    void deleteReview(long reviewIdx) throws Exception;
    void modifyReviewById(ModifyDto modifyDto, MultipartFile file) throws Exception;
    boolean likedReviewByReviewId(Long reviewIdx, Long userIdx);
    boolean unlikedReviewByReviewId(Long reviewIdx, Long userIdx);
}
