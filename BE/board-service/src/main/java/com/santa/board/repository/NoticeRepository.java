package com.santa.board.repository;

import com.santa.board.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    // 모든 Notice 조회
    Page<Notice> findByNoticeDeletedFalse(Pageable pageable);

    // notice_idx 를 통해 notice 정보 조회
    Optional<Notice> findByNoticeIdxAndNoticeDeletedFalse(Long noticeIdx);
}