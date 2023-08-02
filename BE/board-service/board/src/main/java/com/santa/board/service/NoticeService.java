package com.santa.board.service;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.NoticeResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoticeService {
    Page<NoticeResponseDto> getNoticeList(Pageable pageable);
    NoticeResponseDto getNoticeById(Long noticeIdx);
    boolean deleteNoticeById(Long noticeIdx);
    boolean insertNotice(InsertDto insertDto, Long UserIdx);
    boolean modifyNoticeById(ModifyDto modifyDto);
}
