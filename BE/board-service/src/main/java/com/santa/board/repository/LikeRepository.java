package com.santa.board.repository;

import com.santa.board.entity.Liked;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Liked, Long> {
    // 리뷰 idx와 유저 idx로 특정 좋아요 정보를 삭제
    void deleteByIdLikedReviewIdxAndIdLikedUsrIdx(Long likedReviewIdx, Long likedUsrIdx);
    boolean existsByIdLikedReviewIdxAndIdLikedUsrIdx(Long likedReviewIdx, Long likedUsrIdx);
}
