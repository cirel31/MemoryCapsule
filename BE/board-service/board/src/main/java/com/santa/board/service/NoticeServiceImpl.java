package com.santa.board.service;

import com.santa.board.Dto.NoticeDTO;
import com.santa.board.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;

    /**
     * 공지사항 전체 List 를 반환한다.
     * @return List<NoticeDto>
     */
    @Override
    public List<NoticeDTO.ResponseDTO> getNoticeList() {
        return noticeRepository.findByNoticeDeletedFalse();
    }

    /**
     * 공지사항 idx 를 통해 공지사항 상세 정보를 불러온다. 이때 조회수(notice_hit)을 1증가시킨다.
     * @param noticeIdx
     * @return NoticeDto
     */
    @Override
    public NoticeDTO.ResponseDTO getNoticeById(Long noticeIdx) {
        noticeRepository.incrementNoticeHit(noticeIdx);
        return noticeRepository.findByNoticeIdx(noticeIdx);
    }

    /**
     * 공지사항 새로운 글을 등록한다.
     * @param requestDTO
     * @return 성공 여부를 반환한다.
     */
    @Override
    public boolean insertNotice(NoticeDTO.RequestDTO requestDTO) {
        return noticeRepository.insertNewNotice
                (requestDTO.getIdx(),
                        requestDTO.getNoticeTitle(),
                        requestDTO.getNoticeContent(),
                        requestDTO.getNoticeImgurl()
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

    /**
     * 공지사항 글 수정한다.
     * @param requestDTO
     * @return 성공 여부를 반환한다.
     */
    @Override
    public boolean modifyNoticeById(NoticeDTO.RequestDTO requestDTO) {
        return noticeRepository.modifyNoticeByNoticeIdx
                (requestDTO.getNoticeTitle(),
                        requestDTO.getNoticeContent(),
                        requestDTO.getNoticeImgurl(),
                        requestDTO.getIdx()) == 1 ? true : false;
    }
}
