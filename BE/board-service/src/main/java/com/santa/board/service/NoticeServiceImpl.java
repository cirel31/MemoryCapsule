package com.santa.board.service;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.NoticeResponseDto;
import com.santa.board.Enum.LogMessageEnum;
import com.santa.board.Enum.ServiceNameEnum;
import com.santa.board.entity.Notice;
import com.santa.board.exception.DataException;
import com.santa.board.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final FileService fileService;

    private Notice getNoticeByIdx(Long noticeIdx) throws DataException {
        return noticeRepository.findByNoticeIdxAndNoticeDeletedFalse(noticeIdx).orElseThrow(() -> new DataException("idx에 맞는 공지글이 없습니다."));
    }


    /**
     * 공지사항 전체 List 를 반환한다.
     * @return List<NoticeDto>
     */
    @Transactional(readOnly = true)
    @Override
    public Page<NoticeResponseDto> getNoticeList(Pageable pageable) {
        Page<Notice> noticePage = noticeRepository.findByNoticeDeletedFalse(pageable);
        List<NoticeResponseDto> responseDTOList = new NoticeResponseDto().toDtoList(noticePage);
        log.info(LogMessageEnum.TOTAL_LIST_MESSAGE.getLogMessage(ServiceNameEnum.NOTICE, responseDTOList));
        return new PageImpl<>(responseDTOList, pageable, noticePage.getTotalElements());
    }

    /**
     * 공지사항 idx 를 통해 공지사항 상세 정보를 불러온다. 이때 조회수(notice_hit)을 1증가시킨다.
     * @param noticeIdx 공지사항 번호
     * @return NoticeDto
     */
    @Transactional
    @Override
    public NoticeResponseDto getNoticeDtoById(Long noticeIdx) throws Exception {
        Notice notice = getNoticeByIdx(noticeIdx);
        notice.incrementNoticeHit();
        log.info(LogMessageEnum.FIND_BY_IDX_MESSAGE.getLogMessage(ServiceNameEnum.NOTICE, notice));
        return new NoticeResponseDto().toDto(notice);
    }

    /**
     * 공지사항 새로운 글을 등록한다.
     * @param insertDto 새로운 글의 정보
     * @return 성공 여부를 반환한다.
     */
    @Transactional
    @Override
    public Long insertNotice(InsertDto insertDto, Long userIdx, MultipartFile file) throws Exception {
        log.info(LogMessageEnum.INSERT_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.NOTICE, insertDto, userIdx));

        Notice notice = new Notice(userIdx, insertDto.getTitle(), insertDto.getContent(), fileService.getFileName(file));
        return noticeRepository.save(notice).getNoticeIdx();
    }

    /**
     * 공지사항 글을 삭제한다.
     * @param noticeIdx 삭제할 공지사항 idx
     */
    @Transactional
    @Override
    public void deleteNoticeById(Long noticeIdx) throws Exception {
        Notice notice = getNoticeByIdx(noticeIdx);
        notice.deleteNoticeDeleted();
        log.info(LogMessageEnum.DELETE_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.NOTICE, noticeIdx));
    }

    /**
     * 공지사항 글 수정한다.
     * @param modifyDto 수정한 글의 정보
     */
    @Transactional
    @Override
    public void modifyNoticeById(ModifyDto modifyDto, MultipartFile file) throws Exception {
        Notice notice = getNoticeByIdx(modifyDto.getIdx());
        notice.modifyNotice(modifyDto.getTitle(), modifyDto.getContent(), fileService.getFileName(file));
        log.info(LogMessageEnum.MODIFY_ITEM_MESSAGE.getLogMessage(ServiceNameEnum.NOTICE, modifyDto));
    }


}
