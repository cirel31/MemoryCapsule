package com.santa.board.service;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.NoticeResponseDto;
import com.santa.board.Enum.LogMessageEnum;
import com.santa.board.Enum.ServiceNameEnum;
import com.santa.board.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;

    /**
     * 공지사항 전체 List 를 반환한다.
     * @return List<NoticeDto>
     */
    @Transactional(readOnly = true)
    @Override
    public Page<NoticeResponseDto> getNoticeList(Pageable pageable) {
        Page<NoticeResponseDto> responseDTOPage = new NoticeResponseDto().toDtoList(noticeRepository.findByNoticeDeletedFalse(pageable));
        log.info(LogMessageEnum.TOTAL_LIST_MESSAGE.getLogMessage(ServiceNameEnum.NOTICE, responseDTOPage));
        return responseDTOPage;
    }

    /**
     * 공지사항 idx 를 통해 공지사항 상세 정보를 불러온다. 이때 조회수(notice_hit)을 1증가시킨다.
     * @param noticeIdx 공지사항 번호
     * @return NoticeDto
     */
    @Transactional
    @Override
    public NoticeResponseDto getNoticeById(Long noticeIdx) {
        noticeRepository.incrementNoticeHit(noticeIdx);
        NoticeResponseDto responseDTO = new NoticeResponseDto().toDto(noticeRepository.findByNoticeIdx(noticeIdx));
        log.info(LogMessageEnum.FIND_BY_IDX_MESSAGE.getLogMessage(ServiceNameEnum.NOTICE, responseDTO));
        return responseDTO;
    }

    /**
     * 공지사항 새로운 글을 등록한다.
     * @param insertDto 새로운 글의 정보
     * @return 성공 여부를 반환한다.
     */
    @Transactional
    @Override
    public boolean insertNotice(InsertDto insertDto, Long userIdx) {
        log.info(LogMessageEnum.INSERT_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.NOTICE, insertDto, userIdx));
        return noticeRepository.insertNewNotice
                (userIdx,
                        insertDto.getTitle(),
                        insertDto.getContent(),
                        insertDto.getImgurl()
                ) > 0;
    }

    /**
     * 공지사항 글을 삭제한다.
     * @param noticeIdx 삭제할 공지사항 idx
     * @return 성공 여부를 반환한다.
     */
    @Transactional
    @Override
    public boolean deleteNoticeById(Long noticeIdx) {
        log.info(LogMessageEnum.DELETE_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.NOTICE, noticeIdx));
        return noticeRepository.deleteNoticeByNoticeIdx(noticeIdx) == 1;
    }

    /**
     * 공지사항 글 수정한다.
     * @param modifyDto 수정한 글의 정보
     * @return 성공 여부를 반환한다.
     */
    @Transactional
    @Override
    public boolean modifyNoticeById(ModifyDto modifyDto) {
        log.info(LogMessageEnum.MODIFY_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.NOTICE, modifyDto));
        return noticeRepository.modifyNoticeByNoticeIdx
                (modifyDto.getTitle(),
                        modifyDto.getContent(),
                        modifyDto.getImgurl(),
                        modifyDto.getIdx()) == 1;
    }
}
