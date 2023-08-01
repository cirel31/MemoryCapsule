package com.santa.board.service;

import com.santa.board.Dto.NoticeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoticeService {
    Page<NoticeDTO.ResponseDTO> getNoticeList(Pageable pageable);
    NoticeDTO.ResponseDTO getNoticeById(Long noticeIdx);
    boolean deleteNoticeById(Long noticeIdx);
    boolean insertNotice(NoticeDTO.RequestInsertDTO requestDTO, Long UserIdx);
    boolean modifyNoticeById(NoticeDTO.RequestDTO requestDTO);
}
