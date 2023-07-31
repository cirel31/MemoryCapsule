package com.santa.board.repository;

import com.santa.board.Dto.NoticeDto;
import com.santa.board.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    // 모든 Notice 조회
    List<NoticeDto.NoticeResponseDTO> findByNoticeDeletedFalse();
    
    // notice_idx 를 통해 notice 정보 조회
    NoticeDto.NoticeResponseDTO findByNoticeIdx(Long noticeIdx);

    // 공지사항의 notice_hit 값을 1 증가시킴
    @Modifying
    @Query(value = "UPDATE notice SET notice_hit = notice_hit + 1 WHERE notice_idx = :noticeIdx", nativeQuery = true)
    int incrementNoticeHit(@Param("noticeIdx") Long noticeIdx);

    // 공지사항에 새로운 글 등록
    @Modifying
    @Query(value = "INSERT INTO notice (notice_creator_idx, notice_title, notice_content, notice_imgurl, notice_hit) " +
            "VALUES (:noticeCreatorIdx, :noticeTitle, :noticeContent, :noticeImgUrl, 0)", nativeQuery = true)
    int insertNewNotice(@Param("noticeCreatorIdx") Long noticeCreatorIdx,
                        @Param("noticeTitle") String noticeTitle,
                        @Param("noticeContent") String noticeContent,
                        @Param("noticeImgUrl") String noticeImgUrl);

    // 공지사항의 글을 삭제시 notice_delete = 1로 변경
    @Modifying
    @Query("UPDATE Notice n SET n.noticeDeleted = true WHERE n.noticeIdx = :noticeIdx")
    int deleteNoticeByNoticeIdx(@Param("noticeIdx") Long noticeIdx);

    // 공지사항 글을 수정한다.
    @Modifying
    @Query("UPDATE Notice n SET n.noticeTitle = :noticeTitle, n.noticeContent = :noticeContent, n.noticeImgurl = :noticeImgUrl WHERE n.noticeIdx = :noticeIdx")
    int modifyNoticeByNoticeIdx(@Param("noticeTitle") String noticeTitle,
                                @Param("noticeContent") String noticeContent,
                                @Param("noticeImgUrl") String noticeImgUrl,
                                @Param("noticeIdx") Long noticeIdx);
}