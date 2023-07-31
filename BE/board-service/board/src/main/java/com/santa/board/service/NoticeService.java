package com.santa.board.service;

import com.santa.board.Dto.NoticeDTO;

import java.util.List;

public interface NoticeService {
    List<NoticeDTO.ResponseDTO> getNoticeList();
    NoticeDTO.ResponseDTO getNoticeById(Long noticeIdx);
    boolean deleteNoticeById(Long noticeIdx);
    boolean insertNotice(NoticeDTO.RequestDTO requestDTO);
    boolean modifyNoticeById(NoticeDTO.RequestDTO requestDTO);
}
