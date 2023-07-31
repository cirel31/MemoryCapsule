package com.santa.board.service;

import com.santa.board.Dto.NoticeDto;

import java.util.List;

public interface NoticeService {
    List<NoticeDto.NoticeResponseDTO> getNoticeList();
    NoticeDto.NoticeResponseDTO getNoticeById(Long noticeIdx);
    boolean deleteNoticeById(Long noticeIdx);
    boolean insertNotice(NoticeDto.NoticeRequestDTO noticeRequestDTO);
    boolean modifyNoticeById(NoticeDto.NoticeRequestDTO noticeRequestDTO);
}
