package com.santa.board.repository;

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

    Optional<Review> findByReviewIdxAndReviewDeletedFalse(Long reviewIdx);

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