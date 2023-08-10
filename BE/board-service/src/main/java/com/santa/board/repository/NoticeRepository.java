package com.santa.board.repository;

import com.santa.board.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    // 모든 Notice 조회
    Page<Notice> findByNoticeDeletedFalse(Pageable pageable);

    // notice_idx 를 통해 notice 정보 조회
    Optional<Notice> findByNoticeIdxAndNoticeDeletedFalse(Long noticeIdx);

    // 공지사항에 새로운 글 등록
    @Modifying
    @Query(value = "INSERT INTO notice (notice_creator_idx, notice_title, notice_content, notice_imgurl, notice_hit) " +
            "VALUES (:noticeCreatorIdx, :noticeTitle, :noticeContent, :noticeImgUrl, 0) " +
            "RETURNING notice_idx", nativeQuery = true)
    Long insertNewNotice(@Param("noticeCreatorIdx") Long noticeCreatorIdx,
                         @Param("noticeTitle") String noticeTitle,
                         @Param("noticeContent") String noticeContent,
                         @Param("noticeImgUrl") String noticeImgUrl);

}