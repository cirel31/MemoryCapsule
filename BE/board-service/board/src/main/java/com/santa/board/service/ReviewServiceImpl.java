package com.santa.board.service;

import com.santa.board.Dto.ReviewForListResponseDTO;
import com.santa.board.Dto.ReviewRequestDTO;
import com.santa.board.Dto.ReviewResponseDTO;
import com.santa.board.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    /**
     * 전체 리뷰 리스트를 얻는다.
     * @return 리뷰 리스트
     */
    @Override
    public List<ReviewForListResponseDTO> getReviewList() {
        return reviewRepository.findAllReviewData();
    }

    /**
     * 리뷰 idx 값에 맞는 리뷰의 정보를 가져온다. 리뷰 목록에서 하나의 리뷰 글을 누른 것이기에 hit + 1
     * @param userIdx 로그인한 유저 idx (유저가 그 리뷰를 좋아요에 대한 유무)
     * @param reviewIdx 리뷰 idx
     * @return Title, Content, ImgUrl, Hit, Like, Created, writerNickname, isLiked
     */
    @Transactional(rollbackFor={Exception.class})
    @Override
    public ReviewResponseDTO getReviewByReviewId(Long userIdx, Long reviewIdx) {
        reviewRepository.incrementReviewHit(reviewIdx);
        return reviewRepository.findReviewWithIsLikedByReviewIdxAndUserIdx(userIdx, reviewIdx);
    }

    /**
     * 새로운 리뷰 글을 작성한다.
     * @param requestDTO 작성한 리뷰 글에 대한 정보
     * @param userIdx 작성자(로그인한 유저)의 idx
     * @return 성공 유무 
     */
    @Override
    public boolean insertReview(ReviewRequestDTO.InsertDto requestDTO, Long userIdx) {
        return reviewRepository.insertReview
                (requestDTO.getReviewTitle(),
                        requestDTO.getReviewContent(),
                        requestDTO.getReviewImgUrl(),
                        userIdx
                ) > 0 ? true : false;
    }

    /**
     * 리뷰 글을 삭제한다.
     * @param reviewIdx 삭제할 리뷰 idx
     * @return 성공유무
     */
    @Override
    public boolean deleteReview(long reviewIdx) {
        return reviewRepository.deleteReviewByReviewIdx(reviewIdx) == 1 ? true : false;
    }

    /**
     * 리뷰 글을 수정한다.
     * @param requestDTO 수정할 리뷰의 idx
     * @return 성공 유무
     */
    @Override
    public boolean modifyReviewById(ReviewRequestDTO.ModifyDto requestDTO) {
        return reviewRepository.modifyNoticeByNoticeIdx
                (requestDTO.getReviewTitle(),
                        requestDTO.getReviewContent(),
                        requestDTO.getReviewImgUrl(),
                        requestDTO.getReviewIdx()) == 1 ? true : false;
    }

    /**
     * 리뷰에 좋아요를 누른다. -> liked table에 유저idx,리뷰idx가 insert, review table의 like + 1
     * @param reviewIdx 리뷰 idx
     * @param userIdx 좋아요 누른 사람(로그인한 유저)의 idx
     * @return 성공유무
     */
    @Transactional(rollbackFor={Exception.class})
    @Override
    public boolean likedReviewByReviewId(Long reviewIdx, Long userIdx) {
        reviewRepository.incrementReviewLike(reviewIdx);
        return reviewRepository.likedReview(reviewIdx, userIdx) > 0 ? true : false;
    }

    /**
     * 리뷰에 좋아요 누른 것을 취소한다. table에서 delete, like - 1
     * @param reviewIdx
     * @param userIdx
     * @return 성공유무
     */
    @Transactional(rollbackFor={Exception.class})
    @Override
    public boolean unlikedReviewByReviewId(Long reviewIdx, Long userIdx) {
        reviewRepository.reductionReviewLike(reviewIdx);
        return reviewRepository.unlikedReview(reviewIdx, userIdx) > 0 ? true : false;
    }
}
