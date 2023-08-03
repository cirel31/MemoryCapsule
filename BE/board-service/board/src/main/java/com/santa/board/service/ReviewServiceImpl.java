package com.santa.board.service;

import com.mysql.cj.log.Log;
import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.ReviewResponseDTO;
import com.santa.board.Enum.LogMessageEnum;
import com.santa.board.Enum.ServiceNameEnum;
import com.santa.board.entity.Liked;
import com.santa.board.entity.LikedId;
import com.santa.board.repository.LikeRepository;
import com.santa.board.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final LikeRepository likeRepository;

    /**
     * 전체 리뷰 리스트를 얻는다.
     * @return 리뷰 리스트
     */
    @Transactional(readOnly = true)
    @Override
    public Page<ReviewResponseDTO> getReviewList(Pageable pageable) {
        Page<ReviewResponseDTO> responseDTOPage = new ReviewResponseDTO().toDtoList(reviewRepository.findByReviewDeletedFalse(pageable));
        log.info(LogMessageEnum.TOTAL_LIST_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, responseDTOPage));
        return responseDTOPage;
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
        ReviewResponseDTO responseDTO = reviewRepository.findReviewWithIsLikedByReviewIdxAndUserIdx(userIdx, reviewIdx);
        log.info(LogMessageEnum.FIND_BY_IDX_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, reviewIdx, userIdx));
        return responseDTO;
    }

    /**
     * 새로운 리뷰 글을 작성한다.
     * @param insertDto 작성한 리뷰 글에 대한 정보
     * @param userIdx 작성자(로그인한 유저)의 idx
     * @return 성공 유무 
     */
    @Transactional
    @Override
    public boolean insertReview(InsertDto insertDto, Long userIdx) {
        log.info(LogMessageEnum.INSERT_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, insertDto, userIdx));
        return reviewRepository.insertReview
                (insertDto.getTitle(),
                        insertDto.getContent(),
                        insertDto.getImgurl(),
                        userIdx
                ) > 0;
    }

    /**
     * 리뷰 글을 삭제한다.
     * @param reviewIdx 삭제할 리뷰 idx
     * @return 성공유무
     */
    @Transactional
    @Override
    public boolean deleteReview(long reviewIdx) {
        log.info(LogMessageEnum.DELETE_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, reviewIdx));
        return reviewRepository.deleteReviewByReviewIdx(reviewIdx) == 1;
    }

    /**
     * 리뷰 글을 수정한다.
     * @param modifyDto 수정할 리뷰의 idx
     * @return 성공 유무
     */
    @Transactional
    @Override
    public boolean modifyReviewById(ModifyDto modifyDto) {
        log.info(LogMessageEnum.MODIFY_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, modifyDto));
        return reviewRepository.modifyNoticeByNoticeIdx
                (modifyDto.getTitle(),
                        modifyDto.getContent(),
                        modifyDto.getImgurl(),
                        modifyDto.getIdx()) == 1;
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
        LikedId likedId = new LikedId();
        likedId.setLikedReviewIdx(reviewIdx);
        likedId.setLikedUsrIdx(userIdx);

        Liked liked = new Liked();
        liked.setId(likedId);
        reviewRepository.incrementReviewLike(reviewIdx);
        likeRepository.save(liked);
        log.info(LogMessageEnum.LIKE_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, reviewIdx, userIdx));
        return true;
    }

    /**
     * 리뷰에 좋아요 누른 것을 취소한다. table에서 delete, like - 1
     * @param reviewIdx 리뷰 idx
     * @param userIdx 유저 idx
     * @return 성공유무
     */
    @Transactional(rollbackFor={Exception.class})
    @Override
    public boolean unlikedReviewByReviewId(Long reviewIdx, Long userIdx) {
        reviewRepository.reductionReviewLike(reviewIdx);
        likeRepository.deleteByIdLikedReviewIdxAndIdLikedUsrIdx(reviewIdx, userIdx);
        log.info(LogMessageEnum.UNLIKE_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, reviewIdx, userIdx));
        return true;
    }
}
