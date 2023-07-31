package com.santa.board.controller;

import com.santa.board.Dto.NoticeDto;
import com.santa.board.Enum.ResponseStatus;
import com.santa.board.service.NoticeService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {

    private final NoticeService noticeService;

    @ApiOperation(value = "공지사항 목록", notes = "공지사항 리스트들을 반환한다.", response = NoticeDto.NoticeResponseDTO.class)
    @GetMapping("/list")
    public ResponseEntity<NoticeDto.NoticeResponseDTO> getNoticeList() {
        return new ResponseEntity(noticeService.getNoticeList(), HttpStatus.OK);
    }

    @ApiOperation(value = "공지사항 상세보기", notes = "공지사항 id를 통해 공지사항 정보를 가져온다. ", response = NoticeDto.NoticeResponseDTO.class)
    @GetMapping("/{notice_idx}")
    public ResponseEntity<NoticeDto.NoticeResponseDTO> getNoticeById
            (@PathVariable("notice_idx") @ApiParam(value = "공지사항 번호", required = true) Long noticeIdx) {

        return new ResponseEntity(noticeService.getNoticeById(noticeIdx), HttpStatus.OK);
    }

    @ApiOperation(value = "공지사항 등록하기", notes = "공지사항 id를 통해 공지사항 정보를 가져온다. ", response = String.class)
    @PostMapping("")
    public ResponseEntity<String> writeNotice
            (@RequestBody NoticeDto.NoticeRequestDTO noticeRequestDTO) {
        if (noticeService.insertNotice(noticeRequestDTO)) {
            return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "공지사항 삭제하기", notes = "공지사항 id를 통해 공지사항의 글을 삭제한다. 글 한개만 수정됐을 경우만 성공을 반환", response = String.class)
    @DeleteMapping("/{notice_idx}")
    public ResponseEntity<String> deleteNotice
            (@PathVariable("notice_idx") @ApiParam(value = "공지사항 번호", required = true) Long noticeIdx) {
        if (noticeService.deleteNoticeById(noticeIdx)) {
            return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "공지사항 수정하기", notes = "공지사항 글을 수정한다.", response = String.class)
    @PutMapping("/")
    public ResponseEntity<String> modifyNotice
            (@RequestBody NoticeDto.NoticeRequestDTO noticeRequestDTO) {
        if (noticeService.modifyNoticeById(noticeRequestDTO)) {
            return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }
}
