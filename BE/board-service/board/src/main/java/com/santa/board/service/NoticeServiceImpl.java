package com.santa.board.service;

import com.santa.board.Dto.NoticeDto;
import com.santa.board.repository.NoticeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;

    public NoticeServiceImpl(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    /**
     * 공지사항 전체 List 를 반환한다.
     * @return List<NoticeDto>
     */
    @Override
    public List<NoticeDto.NoticeResponseDTO> getNoticeList() {
        return noticeRepository.findByNoticeDeletedFalse();
    }

    /**
     * 공지사항 idx 를 통해 공지사항 상세 정보를 불러온다. 이때 조회수(notice_hit)을 1증가시킨다.
     * @param noticeIdx
     * @return NoticeDto
     */
    @Override
    public NoticeDto.NoticeResponseDTO getNoticeById(Long noticeIdx) {
        noticeRepository.incrementNoticeHit(noticeIdx);
        return noticeRepository.findByNoticeIdx(noticeIdx);
    }

    /**
     * 공지사항 새로운 글을 등록한다.
     * @param noticeRequestDTO
     * @return 성공 여부를 반환한다.
     */
    @Override
    public boolean insertNotice(NoticeDto.NoticeRequestDTO noticeRequestDTO) {
        return noticeRepository.insertNewNotice
                (noticeRequestDTO.getIdx(),
                        noticeRequestDTO.getNoticeTitle(),
                        noticeRequestDTO.getNoticeContent(),
                        noticeRequestDTO.getNoticeImgurl()
                ) > 0 ? true : false;
    }

    /**
     * 공지사항 글을 삭제한다.
     * @param noticeIdx
     * @return 성공 여부를 반환한다.
     */
    @Override
    public boolean deleteNoticeById(Long noticeIdx) {
        return noticeRepository.deleteNoticeByNoticeIdx(noticeIdx) == 1 ? true : false;
    }

    @Override
    public boolean modifyNoticeById(NoticeDto.NoticeRequestDTO noticeRequestDTO) {
        return noticeRepository.modifyNoticeByNoticeIdx
                (noticeRequestDTO.getNoticeTitle(),
                        noticeRequestDTO.getNoticeContent(),
                        noticeRequestDTO.getNoticeImgurl(),
                        noticeRequestDTO.getIdx()) == 1 ? true : false;
    }
}
