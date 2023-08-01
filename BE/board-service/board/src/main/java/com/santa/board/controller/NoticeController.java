package com.santa.board.controller;

import com.santa.board.Dto.NoticeDTO;
import com.santa.board.Enum.ResponseStatus;
import com.santa.board.service.NoticeService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {

    private final NoticeService noticeService;

    @ApiOperation(value = "공지사항 목록", notes = "공지사항 리스트들을 반환한다.", response = NoticeDTO.ResponseDTO.class)
    @GetMapping("/list")
    public ResponseEntity<NoticeDTO.ResponseDTO> getNoticeList(Pageable pageable) {
        return new ResponseEntity(noticeService.getNoticeList(pageable).getContent(), HttpStatus.OK);
    }

    @ApiOperation(value = "공지사항 상세보기", notes = "공지사항 id를 통해 공지사항 정보를 가져온다. ", response = NoticeDTO.ResponseDTO.class)
    @GetMapping("/{notice_idx}")
    public ResponseEntity<NoticeDTO.ResponseDTO> getNoticeById
            (@PathVariable("notice_idx") @ApiParam(value = "공지사항 번호", required = true) Long noticeIdx) {

        return new ResponseEntity<>(noticeService.getNoticeById(noticeIdx), HttpStatus.OK);
    }

    @ApiOperation(value = "공지사항 등록하기", notes = "공지사항 글을 등록한다. 성공 유무 반환", response = String.class)
    @PostMapping("")
    public ResponseEntity<String> writeNotice
            (@RequestBody NoticeDTO.RequestInsertDTO requestDTO, HttpServletRequest request) {
        Long user_idx = Long.valueOf(String.valueOf(request.getHeader("userId")));
        if (noticeService.insertNotice(requestDTO, user_idx)) {
            return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "공지사항 삭제하기", notes = "공지사항 id를 통해 공지사항의 글을 삭제한다. 성공 유무 반환", response = String.class)
    @DeleteMapping("/{notice_idx}")
    public ResponseEntity<String> deleteNotice
            (@PathVariable("notice_idx") @ApiParam(value = "공지사항 번호", required = true) Long noticeIdx) {
        if (noticeService.deleteNoticeById(noticeIdx)) {
            return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "공지사항 수정하기", notes = "공지사항 글을 수정한다. 성공 유무 반환", response = String.class)
    @PutMapping("/")
    public ResponseEntity<String> modifyNotice
            (@RequestBody NoticeDTO.RequestDTO requestDTO) {
        if (noticeService.modifyNoticeById(requestDTO)) {
            return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }
}
