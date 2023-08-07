package com.santa.board.service;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.NoticeResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface NoticeService {
    Page<NoticeResponseDto> getNoticeList(Pageable pageable);
    NoticeResponseDto getNoticeDtoById(Long noticeIdx) throws Exception;
    void deleteNoticeById(Long noticeIdx) throws Exception;
    boolean insertNotice(InsertDto insertDto, Long UserIdx, MultipartFile file) throws Exception;
    void modifyNoticeById(ModifyDto modifyDto, MultipartFile file) throws Exception;
}
