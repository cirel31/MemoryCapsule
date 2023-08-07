package com.santa.board.repository;

import com.santa.board.Dto.ReviewResponseDTO;
import com.santa.board.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    //리뷰 전체 찾기
    Page<Review> findByReviewDeletedFalse(Pageable pageable);

    // reviewIdx에 맞는 정보 조회(userIdx가 그 리뷰를 좋아요 했는지의 유무 포함)
    @Query("SELECT new com.santa.board.Dto.ReviewResponseDTO(r.reviewIdx, r.reviewTitle, r.reviewContent, r.reviewImgUrl, r.reviewHit, r.reviewLike, " +
            "r.reviewCreated, " +
            "r.user.userNickname, " +
            "CASE WHEN l.id.likedReviewIdx IS NOT NULL THEN true ELSE false END) " +
            "FROM Review r LEFT JOIN Liked l ON r.reviewIdx = l.id.likedReviewIdx AND l.id.likedUsrIdx = :userIdx " +
            "WHERE r.reviewIdx = :reviewIdx")
    ReviewResponseDTO findReviewWithIsLikedByReviewIdxAndUserIdx(@Param("userIdx") Long userIdx, @Param("reviewIdx") Long reviewIdx);

    Optional<Review> findByReviewIdxAndReviewDeletedFalse(Long reviewIdx);

    //리뷰 글 등록하기
    @Modifying
    @Query(value = "INSERT INTO review (review_title, review_content, review_imgurl, review_usr_idx) " +
            "VALUES (:title, :content, :imgUrl, :userIdx)", nativeQuery = true)
    int insertReview(@Param("title") String title,
                      @Param("content") String content,
                      @Param("imgUrl") String imgUrl,
                      @Param("userIdx") Long userIdx);

    //review에 like + 1
    @Modifying
    @Query("UPDATE Review r " +
            "SET r.reviewLike = r.reviewLike + 1 " +
            "WHERE r.reviewIdx = :reviewIdx")
    int incrementReviewLike(@Param("reviewIdx") Long reviewIdx);


    //review에 like - 1
    @Modifying
    @Query("UPDATE Review r " +
            "SET r.reviewLike = r.reviewLike - 1 " +
            "WHERE r.reviewIdx = :reviewIdx")
    int reductionReviewLike(@Param("reviewIdx") Long reviewIdx);
}