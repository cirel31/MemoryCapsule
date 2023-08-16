package com.santa.board.service;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.ReviewResponseDTO;
import com.santa.board.Enum.LogMessageEnum;
import com.santa.board.Enum.ServiceNameEnum;
import com.santa.board.entity.Liked;
import com.santa.board.entity.LikedId;
import com.santa.board.entity.Review;
import com.santa.board.entity.User;
import com.santa.board.exception.DataException;
import com.santa.board.repository.LikeRepository;
import com.santa.board.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final LikeRepository likeRepository;
    private final FileService fileService;

    private Review getReviewByIdx(Long reviewIdx) throws Exception {
        return reviewRepository.findByReviewIdxAndReviewDeletedFalse(reviewIdx).orElseThrow(() -> new DataException("idx에 맞는 리뷰글이 없습니다."));
    }

    /**
     * 전체 리뷰 리스트를 얻는다.
     * @return 리뷰 리스트
     * @param pageable 페이지
     */
    @Transactional(readOnly = true)
    @Override
    public Page<ReviewResponseDTO> getReviewList(Pageable pageable) {
        Page<Review> reviewPage = reviewRepository.findByReviewDeletedFalse(pageable);
        List<ReviewResponseDTO> responseDTOList = new ReviewResponseDTO().toDtoList(reviewPage);
        log.info(LogMessageEnum.TOTAL_LIST_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, responseDTOList));
        return new PageImpl<>(responseDTOList, pageable, reviewPage.getTotalElements());
    }

    /**
     * 리뷰 idx 값에 맞는 리뷰의 정보를 가져온다. 리뷰 목록에서 하나의 리뷰 글을 누른 것이기에 hit + 1
     * @param userIdx 로그인한 유저 idx (유저가 그 리뷰를 좋아요에 대한 유무)
     * @param reviewIdx 리뷰 idx
     * @return Title, Content, ImgUrl, Hit, Like, Created, writerNickname, isLiked
     * @throws Exception 에러
     */
    @Transactional(rollbackFor={Exception.class})
    @Override
    public ReviewResponseDTO getReviewByReviewId(Long userIdx, Long reviewIdx) throws Exception {
        Review review = getReviewByIdx(reviewIdx);
        review.incrementReviewHit();
        log.info(LogMessageEnum.FIND_BY_IDX_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, review));
        return new ReviewResponseDTO().toDto(review, likeRepository.existsByIdLikedReviewIdxAndIdLikedUsrIdx(reviewIdx, userIdx));
    }

    /**
     * 새로운 리뷰 글을 작성한다.
     * @param insertDto 작성한 리뷰 글에 대한 정보
     * @param userIdx 작성자(로그인한 유저)의 idx
     * @param file 파일
     * @return 성공 유무
     * @throws Exception 에러
     */
    @Transactional
    @Override
    public Long insertReview(InsertDto insertDto, Long userIdx, MultipartFile file) throws Exception {
        log.info(LogMessageEnum.INSERT_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, insertDto, userIdx));
        Review review = Review.builder()
                .user(User.builder().userIdx(userIdx).build())
                .reviewTitle(insertDto.getTitle())
                .reviewContent(insertDto.getContent())
                .reviewImgUrl(fileService.getFileName(file))
                .reviewDeleted(false)
                .reviewCreated(new Date())
                .reviewUpdated(new Date())
                .reviewHit(0)
                .build();
        log.info("review 저장할 내용" + review);
        return reviewRepository.save(review).getReviewIdx();
    }

    /**
     * 리뷰 글을 삭제한다.
     * @param reviewIdx 삭제할 리뷰 idx
     */
    @Transactional
    @Override
    public void deleteReview(long reviewIdx) throws Exception {
        Review review = getReviewByIdx(reviewIdx);
        review.deletedReview();
        log.info(LogMessageEnum.DELETE_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, reviewIdx));
    }

    /**
     * 리뷰 글을 수정한다.
     * @param modifyDto 수정할 리뷰의 idx
     */
    @Transactional
    @Override
    public void modifyReviewById(ModifyDto modifyDto, MultipartFile file) throws Exception {
        Review review = getReviewByIdx(modifyDto.getIdx());
        review.modifyReview(modifyDto.getTitle(), modifyDto.getContent(), fileService.getFileName(file));
        log.info(LogMessageEnum.MODIFY_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, modifyDto));
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
        Optional<Liked> likedOptional = likeRepository.findByIdLikedReviewIdxAndIdLikedUsrIdx(reviewIdx, userIdx);
        if (likedOptional.isPresent()) {
            return false;
        }
        LikedId likedId = new LikedId();
        likedId.setLikedReviewIdx(reviewIdx);
        likedId.setLikedUsrIdx(userIdx);
        Liked liked = new Liked();
        liked.setId(likedId);
        likeRepository.save(liked);
        reviewRepository.incrementReviewLike(reviewIdx);
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
        likeRepository.deleteByIdLikedReviewIdxAndIdLikedUsrIdx(reviewIdx, userIdx);
        reviewRepository.reductionReviewLike(reviewIdx);
        log.info(LogMessageEnum.UNLIKE_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.REVIEW, reviewIdx, userIdx));
        return true;
    }
}
