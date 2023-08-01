package com.santa.board.repository;

import com.santa.board.Dto.ReviewForListResponseDTO;
import com.santa.board.Dto.ReviewResponseDTO;
import com.santa.board.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    //리뷰 전체 찾기
    @Query("SELECT new com.santa.board.Dto.ReviewForListResponseDTO(r.reviewTitle, r.reviewHit, r.reviewLike, " +
            "r.reviewCreated, r.user.userNickname) FROM Review r")
    Page<ReviewForListResponseDTO> findAllReviewData(Pageable pageable);

    // reviewIdx에 맞는 정보 조회(userIdx가 그 리뷰를 좋아요 했는지의 유무 포함)
    @Query("SELECT new com.santa.board.Dto.ReviewResponseDTO(r.reviewTitle, r.reviewContent, r.reviewImgUrl, r.reviewHit, r.reviewLike, " +
            "r.reviewCreated, " +
            "r.user.userNickname, " +
            "CASE WHEN l.id.likedReviewIdx IS NOT NULL THEN true ELSE false END) " +
            "FROM Review r LEFT JOIN Liked l ON r.reviewIdx = l.id.likedReviewIdx AND l.id.likedUsrIdx = :userIdx " +
            "WHERE r.reviewIdx = :reviewIdx")
    ReviewResponseDTO findReviewWithIsLikedByReviewIdxAndUserIdx(@Param("userIdx") Long userIdx, @Param("reviewIdx") Long reviewIdx);

    //hit + 1
    @Modifying
    @Query("UPDATE Review r " +
            "SET r.reviewHit = r.reviewHit + 1 " +
            "WHERE r.reviewIdx = :reviewIdx")
    int incrementReviewHit(@Param("reviewIdx") Long reviewIdx);

    //리뷰 글 등록하기
    @Modifying
    @Query(value = "INSERT INTO Review (review_title, review_content, review_imgurl, review_usr_idx) " +
            "VALUES (:title, :content, :imgUrl, :userIdx)", nativeQuery = true)
    int insertReview(@Param("title") String title,
                      @Param("content") String content,
                      @Param("imgUrl") String imgUrl,
                      @Param("userIdx") Long userIdx);

    // 리뷰 글 삭제
    @Modifying
    @Query("UPDATE Review r SET r.reviewDeleted = true WHERE r.reviewIdx = :reviewIdx")
    int deleteReviewByReviewIdx(@Param("reviewIdx") Long reviewIdx);

    //리뷰 글 수정
    @Modifying
    @Query("UPDATE Review r " +
            "SET r.reviewTitle = :reviewTitle, r.reviewContent = :reviewContent, " +
            "r.reviewImgUrl = :reviewImgUrl, r.reviewUpdated = CURRENT_TIMESTAMP " +
            "WHERE r.reviewIdx = :reviewIdx")
    int modifyNoticeByNoticeIdx(@Param("reviewTitle") String reviewTitle,
                                @Param("reviewContent") String reviewContent,
                                @Param("reviewImgUrl") String reviewImgUrl,
                                @Param("reviewIdx") Long reviewIdx);

    // 좋아요 누르기
    @Modifying
    @Query(value = "INSERT INTO Liked (liked_review_idx, liked_usr_idx) " +
            "VALUES (:reviewIdx, :userIdx)", nativeQuery = true)
    int likedReview(@Param("reviewIdx") Long reviewIdx,
                     @Param("userIdx") Long userIdx);

    //review에 like + 1
    @Modifying
    @Query("UPDATE Review r " +
            "SET r.reviewLike = r.reviewLike + 1 " +
            "WHERE r.reviewIdx = :reviewIdx")
    int incrementReviewLike(@Param("reviewIdx") Long reviewIdx);

    //좋아요 취소
    @Modifying
    @Query(value = "DELETE FROM Review r " +
            "WHERE r.reviewIdx = :reviewIdx " +
            "AND r.user.userIdx = :userIdx")
    int unlikedReview(@Param("reviewIdx") Long reviewIdx,
                    @Param("userIdx") Long userIdx);

    //review에 like - 1
    @Modifying
    @Query("UPDATE Review r " +
            "SET r.reviewLike = r.reviewLike - 1 " +
            "WHERE r.reviewIdx = :reviewIdx")
    int reductionReviewLike(@Param("reviewIdx") Long reviewIdx);
}