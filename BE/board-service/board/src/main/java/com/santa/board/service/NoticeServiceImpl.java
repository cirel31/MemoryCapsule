package com.santa.board.service;

import com.santa.board.Dto.NoticeDTO;
import com.santa.board.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
    public Page<NoticeDTO.ResponseDTO> getNoticeList(Pageable pageable) {
        return noticeRepository.findByNoticeDeletedFalse(pageable);
    }

    /**
     * 공지사항 idx 를 통해 공지사항 상세 정보를 불러온다. 이때 조회수(notice_hit)을 1증가시킨다.
     * @param noticeIdx 공지사항 번호
     * @return NoticeDto
     */
    @Override
    public NoticeDTO.ResponseDTO getNoticeById(Long noticeIdx) {
        noticeRepository.incrementNoticeHit(noticeIdx);
        return noticeRepository.findByNoticeIdx(noticeIdx);
    }

    /**
     * 공지사항 새로운 글을 등록한다.
     * @param requestDTO 새로운 글의 정보
     * @return 성공 여부를 반환한다.
     */
    @Override
    public boolean insertNotice(NoticeDTO.RequestInsertDTO requestDTO, Long UserIdx) {
        return noticeRepository.insertNewNotice
                (UserIdx,
                        requestDTO.getNoticeTitle(),
                        requestDTO.getNoticeContent(),
                        requestDTO.getNoticeImgurl()
                ) > 0;
    }

    /**
     * 공지사항 글을 삭제한다.
     * @param noticeIdx 삭제할 공지사항 idx
     * @return 성공 여부를 반환한다.
     */
    @Override
    public boolean deleteNoticeById(Long noticeIdx) {
        return noticeRepository.deleteNoticeByNoticeIdx(noticeIdx) == 1;
    }

    /**
     * 공지사항 글 수정한다.
     * @param requestDTO 수정한 글의 정보
     * @return 성공 여부를 반환한다.
     */
    @Override
    public boolean modifyNoticeById(NoticeDTO.RequestDTO requestDTO) {
        return noticeRepository.modifyNoticeByNoticeIdx
                (requestDTO.getNoticeTitle(),
                        requestDTO.getNoticeContent(),
                        requestDTO.getNoticeImgurl(),
                        requestDTO.getIdx()) == 1;
    }
}
