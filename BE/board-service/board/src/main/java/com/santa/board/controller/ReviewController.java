package com.santa.board.controller;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ModifyDto;
import com.santa.board.Dto.ReviewForListResponseDTO;
import com.santa.board.Dto.ReviewResponseDTO;
import com.santa.board.Enum.ResponseStatus;
import com.santa.board.service.ReviewService;
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
@RequestMapping("/review")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {
    private final ReviewService reviewService;

    @ApiOperation(value = "리뷰 목록", notes = "리뷰 리스트들을 반환한다.", response = ReviewResponseDTO.class)
    @GetMapping("/list")
    public ResponseEntity<ReviewForListResponseDTO> getReviewList(Pageable pageable) {
        return new ResponseEntity(reviewService.getReviewList(pageable).getContent(), HttpStatus.OK);
    }

    @ApiOperation(value = "리뷰 상세보기", notes = "리뷰 id를 통해 리뷰 상세정보를 가져온다. 또한 로그인한 유저 id를 통해 리뷰의 좋아요 유무도 포함되어있다.", response = ReviewResponseDTO.class)
    @GetMapping("/{review_idx}")
    public ResponseEntity<ReviewResponseDTO> getReviewById
            (@PathVariable("review_idx") @ApiParam(value = "리뷰 번호", required = true) Long review_idx, HttpServletRequest request) {
        Long user_idx = Long.valueOf(String.valueOf(request.getHeader("userId")));
        return new ResponseEntity<>(reviewService.getReviewByReviewId(user_idx, review_idx), HttpStatus.OK);
    }

    @ApiOperation(value = "리뷰 등록하기", notes = "리뷰 글을 등록한다. 성공 유무 반환", response = String.class)
    @PostMapping("")
    public ResponseEntity<String> writeReview
            (@RequestBody InsertDto insertDto, HttpServletRequest request) {
        Long user_idx = Long.valueOf(String.valueOf(request.getHeader("userId")));
        if (reviewService.insertReview(insertDto, user_idx)) {
            return new ResponseEntity(com.santa.board.Enum.ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(com.santa.board.Enum.ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "리뷰 삭제하기", notes = "리뷰 id를 통해 리뷰 글을 삭제한다. 성공 유무 반환", response = String.class)
    @DeleteMapping("/{review_idx}")
    public ResponseEntity<String> deleteReview
            (@PathVariable("review_idx") @ApiParam(value = "리뷰 번호", required = true) Long reviewIdx) {
        if (reviewService.deleteReview(reviewIdx)) {
            return new ResponseEntity(com.santa.board.Enum.ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(com.santa.board.Enum.ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "리뷰 수정하기", notes = "리뷰 글을 수정한다. 성공 유무 반환", response = String.class)
    @PutMapping("")
    public ResponseEntity<String> modifyReview
            (@RequestBody ModifyDto modifyDto) {

        if (reviewService.modifyReviewById(modifyDto)) {
            return new ResponseEntity(com.santa.board.Enum.ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "좋아요 누르기", notes = "좋아요를 누른다. 성공 유무 반환", response = String.class)
    @PostMapping("/liked/{review_idx}")
    public ResponseEntity<String> likedReview
            (@PathVariable("review_idx") @ApiParam(value = "리뷰 번호", required = true) Long review_idx, HttpServletRequest request) {
        Long user_idx = Long.valueOf(String.valueOf(request.getHeader("userId")));
        if (reviewService.likedReviewByReviewId(review_idx, user_idx)) {
            return new ResponseEntity(com.santa.board.Enum.ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(com.santa.board.Enum.ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "좋아요 취소하기", notes = "좋아요를 취소한다. 성공 유무 반환", response = String.class)
    @DeleteMapping("/liked/{review_idx}")
    public ResponseEntity<String> unlikedReview
            (@PathVariable("review_idx") @ApiParam(value = "리뷰 번호", required = true) Long reviewIdx, HttpServletRequest request) {
        Long user_idx = Long.valueOf(String.valueOf(request.getHeader("userId")));
        if (reviewService.unlikedReviewByReviewId(reviewIdx, user_idx)) {
            return new ResponseEntity(com.santa.board.Enum.ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(com.santa.board.Enum.ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }
}
