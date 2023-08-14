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

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {

    private final NoticeService noticeService;

    @ApiOperation(value = "공지사항 목록", notes = "공지사항 리스트들을 반환한다.", response = NoticeResponseDto.class)
    @GetMapping("/list")
    public ResponseEntity getNoticeList(Pageable pageable) {
        return new ResponseEntity(noticeService.getNoticeList(pageable), HttpStatus.OK);
    }

    @ApiOperation(value = "공지사항 상세보기", notes = "공지사항 id를 통해 공지사항 정보를 가져온다. ", response = NoticeResponseDto.class)
    @GetMapping("/{notice_idx}")
    public ResponseEntity getNoticeById
            (@PathVariable("notice_idx") @ApiParam(value = "공지사항 번호", required = true) Long noticeIdx) {
        try {
            return new ResponseEntity<>(noticeService.getNoticeDtoById(noticeIdx), HttpStatus.OK);
        } catch(Exception e) {
            log.error(e.getMessage());
        }
        return new ResponseEntity<>(ResponseStatus.ERROR, HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "공지사항 등록하기", notes = "공지사항 글을 등록한다. 성공 유무 반환", response = String.class)
    @PostMapping("")
    public ResponseEntity<String> writeNotice
            (@RequestPart(value = "insertDto") InsertDto insertDto, HttpServletRequest request,
             @RequestPart(value = "file", required = false) MultipartFile file) {
        Long user_idx = Long.valueOf(String.valueOf(request.getHeader("userId")));
        try {
            return new ResponseEntity<>("new noticeIdx : " + noticeService.insertNotice(insertDto, user_idx, file), HttpStatus.OK);
        } catch(Exception e) {
            log.error(e.getMessage());
        }
        return new ResponseEntity(ResponseStatus.ERROR, HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "공지사항 삭제하기", notes = "공지사항 id를 통해 공지사항의 글을 삭제한다. 성공 유무 반환", response = String.class)
    @DeleteMapping("/{notice_idx}")
    public ResponseEntity<ResponseStatus> deleteNotice
            (@PathVariable("notice_idx") @ApiParam(value = "공지사항 번호", required = true) Long noticeIdx) {
        try {
            noticeService.deleteNoticeById(noticeIdx);
            return new ResponseEntity<>(ResponseStatus.SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return new ResponseEntity<>(ResponseStatus.ERROR, HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "공지사항 수정하기", notes = "공지사항 글을 수정한다. 성공 유무 반환", response = String.class)
    @PutMapping("")
    public ResponseEntity<ResponseStatus> modifyNotice (
            @RequestPart(value = "modifyDto") ModifyDto modifyDto,
             @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            noticeService.modifyNoticeById(modifyDto, file);
            return new ResponseEntity<>(ResponseStatus.SUCCESS, HttpStatus.OK);
        } catch(Exception e) {
            log.error(e.getMessage());
        }
        return new ResponseEntity<>(ResponseStatus.ERROR, HttpStatus.BAD_REQUEST);
    }
}
