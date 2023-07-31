package com.santa.board.controller;

import com.santa.board.Dto.ReviewForListResponseDTO;
import com.santa.board.Dto.ReviewRequestDTO;
import com.santa.board.Dto.ReviewResponseDTO;
import com.santa.board.Enum.ResponseStatus;
import com.santa.board.service.ReviewService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {
    private final ReviewService reviewService;

    @ApiOperation(value = "리뷰 목록", notes = "리뷰 리스트들을 반환한다.", response = ReviewResponseDTO.class)
    @GetMapping("/list")
    public ResponseEntity<ReviewForListResponseDTO> getReviewList() {
        return new ResponseEntity(reviewService.getReviewList(), HttpStatus.OK);
    }

    @ApiOperation(value = "리뷰 상세보기", notes = "리뷰 id를 통해 리뷰 상세정보를 가져온다. 또한 로그인한 유저 id를 통해 리뷰의 좋아요 유무도 포함되어있다.", response = ReviewResponseDTO.class)
    @GetMapping("/{user_idx}/{review_idx}")
    public ResponseEntity<ReviewResponseDTO> getReviewById
            (@PathVariable("user_idx") @ApiParam(value = "유저 번호", required = true) Long user_idx,
             @PathVariable("review_idx") @ApiParam(value = "리뷰 번호", required = true) Long review_idx) {
        return new ResponseEntity(reviewService.getReviewByReviewId(user_idx, review_idx), HttpStatus.OK);
    }

    @ApiOperation(value = "리뷰 등록하기", notes = "리뷰 글을 등록한다. 성공 유무 반환", response = String.class)
    @PostMapping("")
    public ResponseEntity<String> writeReview
            (@RequestBody ReviewRequestDTO requestDTO) {
        if (reviewService.insertReview(requestDTO)) {
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
    @PutMapping("/")
    public ResponseEntity<String> modifyReview
            (@RequestBody ReviewRequestDTO requestDTO) {
        if (reviewService.modifyReviewById(requestDTO)) {
            return new ResponseEntity(com.santa.board.Enum.ResponseStatus.SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
    }
}
