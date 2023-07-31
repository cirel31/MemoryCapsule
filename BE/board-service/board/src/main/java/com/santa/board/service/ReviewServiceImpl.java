package com.santa.board.service;

import com.santa.board.Dto.ReviewForListResponseDTO;
import com.santa.board.Dto.ReviewRequestDTO;
import com.santa.board.Dto.ReviewResponseDTO;
import com.santa.board.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    @Override
    public List<ReviewForListResponseDTO> getReviewList() {
        return reviewRepository.findAllReviewData();
    }

    @Override
    public ReviewResponseDTO getReviewByReviewId(Long userIdx, Long reviewIdx) {
        return reviewRepository.findReviewWithIsLikedByReviewIdxAndUserIdx(userIdx, reviewIdx);
    }
    @Override
    public boolean insertReview(ReviewRequestDTO requestDTO) {
        return reviewRepository.insertReview
                (requestDTO.getReviewTitle(),
                        requestDTO.getReviewContent(),
                        requestDTO.getReviewImgUrl(),
                        requestDTO.getUserIdx()
                ) > 0 ? true : false;
    }

    @Override
    public boolean deleteReview(long reviewIdx) {
        return reviewRepository.deleteReviewByReviewIdx(reviewIdx) == 1 ? true : false;
    }

    @Override
    public boolean modifyReviewById(ReviewRequestDTO requestDTO) {
        return reviewRepository.modifyNoticeByNoticeIdx
                (requestDTO.getReviewTitle(),
                        requestDTO.getReviewContent(),
                        requestDTO.getReviewImgUrl(),
                        requestDTO.getUserIdx()) == 1 ? true : false;
    }
}
