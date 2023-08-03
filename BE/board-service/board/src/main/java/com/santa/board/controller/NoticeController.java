package com.santa.board.controller;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.NoticeResponseDto;
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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {

    private final NoticeService noticeService;

    @ApiOperation(value = "공지사항 목록", notes = "공지사항 리스트들을 반환한다.", response = NoticeResponseDto.class)
    @GetMapping("/list")
    public ResponseEntity<NoticeResponseDto> getNoticeList(Pageable pageable) throws Exception {
        try {
            return new ResponseEntity(noticeService.getNoticeList(pageable).getContent(), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity(ResponseStatus.ERROR, HttpStatus.NO_CONTENT);
        }
    }

    @ApiOperation(value = "공지사항 상세보기", notes = "공지사항 id를 통해 공지사항 정보를 가져온다. ", response = NoticeResponseDto.class)
    @GetMapping("/{notice_idx}")
    public ResponseEntity<NoticeResponseDto> getNoticeById
            (@PathVariable("notice_idx") @ApiParam(value = "공지사항 번호", required = true) Long noticeIdx) throws Exception {
        try {
            return new ResponseEntity<>(noticeService.getNoticeById(noticeIdx), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity(ResponseStatus.ERROR, HttpStatus.NO_CONTENT);
        }
    }

    @ApiOperation(value = "공지사항 등록하기", notes = "공지사항 글을 등록한다. 성공 유무 반환", response = String.class)
    @PostMapping("")
    public ResponseEntity<String> writeNotice
            (@RequestBody InsertDto insertDto, HttpServletRequest request,
             @RequestParam(value = "file", required = false) MultipartFile file) {
        Long user_idx = Long.valueOf(String.valueOf(request.getHeader("userId")));
        try {
            if (noticeService.insertNotice(insertDto, user_idx, file)) {
                return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
            }
            return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
        } catch(Exception e) {
            return new ResponseEntity(ResponseStatus.ERROR, HttpStatus.NO_CONTENT);
        }
    }

    @ApiOperation(value = "공지사항 삭제하기", notes = "공지사항 id를 통해 공지사항의 글을 삭제한다. 성공 유무 반환", response = String.class)
    @DeleteMapping("/{notice_idx}")
    public ResponseEntity<String> deleteNotice
            (@PathVariable("notice_idx") @ApiParam(value = "공지사항 번호", required = true) Long noticeIdx) {
        try {
            if (noticeService.deleteNoticeById(noticeIdx)) {
                return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
            }
            return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity(ResponseStatus.ERROR, HttpStatus.NO_CONTENT);
        }
    }

    @ApiOperation(value = "공지사항 수정하기", notes = "공지사항 글을 수정한다. 성공 유무 반환", response = String.class)
    @PutMapping("")
    public ResponseEntity<String> modifyNotice (
            @RequestBody ModifyDto modifyDto,
             @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            if (noticeService.modifyNoticeById(modifyDto, file)) {
                return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
            }
            return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
        } catch(Exception e) {
            return new ResponseEntity(ResponseStatus.ERROR, HttpStatus.NO_CONTENT);
        }
    }
}
