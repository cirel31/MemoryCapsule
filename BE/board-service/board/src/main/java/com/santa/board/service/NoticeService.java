package com.santa.board.service;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.NoticeResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface NoticeService {
    Page<NoticeResponseDto> getNoticeList(Pageable pageable) throws Exception;
    NoticeResponseDto getNoticeById(Long noticeIdx) throws Exception;
    boolean deleteNoticeById(Long noticeIdx) throws Exception;
    boolean insertNotice(InsertDto insertDto, Long UserIdx, MultipartFile file) throws Exception;
    boolean modifyNoticeById(ModifyDto modifyDto, MultipartFile file) throws Exception;
}
