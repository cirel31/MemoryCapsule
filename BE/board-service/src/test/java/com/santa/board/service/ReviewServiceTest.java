package com.santa.board.service;

import com.santa.board.Dto.InsertDto;
import com.santa.board.Dto.ReviewResponseDTO;
import com.santa.board.entity.Liked;
import com.santa.board.entity.LikedId;
import com.santa.board.entity.Review;
import com.santa.board.repository.LikeRepository;
import com.santa.board.repository.ReviewRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private FileService fileService;

    @InjectMocks
    private ReviewServiceImpl reviewService;

    @Test
    public void testGetReviewList() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);
        List<Review> reviewList = Arrays.asList(
                new Review(1L, "Title 1", "Content 1", "image1.jpg"),
                new Review(2L, "Title 2", "Content 2", "image2.jpg")
        );
        Page<Review> page = new PageImpl<>(reviewList, pageable, reviewList.size());

        when(reviewRepository.findByReviewDeletedFalse(pageable)).thenReturn(page);

        // When
        Page<ReviewResponseDTO> resultPage = reviewService.getReviewList(pageable);

        // Then
        assertEquals(2, resultPage.getContent().size());
    }

    @Test
    public void testGetReviewByReviewId() throws Exception {
        // Given
        Long userIdx = 1L;
        Long reviewIdx = 2L;
        Review review = new Review(2L, "Test Title", "Test Content", "test_image.jpg");

        when(reviewRepository.findByReviewIdxAndReviewDeletedFalse(reviewIdx)).thenReturn(Optional.of(review));
        when(likeRepository.existsByIdLikedReviewIdxAndIdLikedUsrIdx(reviewIdx, userIdx)).thenReturn(true);

        // When
        ReviewResponseDTO result = reviewService.getReviewByReviewId(userIdx, reviewIdx);


        // Then
        assertNotNull(result);
        assertEquals("Test Title", result.getReviewTitle());
        assertEquals("Test Content", result.getReviewContent());
        assertEquals("test_image.jpg", result.getReviewImgUrl());
        assertTrue(result.isLiked());
    }

    @Test
    public void testInsertReview() throws Exception {
        // Given
        InsertDto insertDto = new InsertDto();
        insertDto.setTitle("Test Title");
        insertDto.setContent("Test Content");
        Long userIdx = 1L;
        MultipartFile mockFile = mock(MultipartFile.class);

        when(fileService.getFileName(mockFile)).thenReturn("test_image.jpg");
        when(reviewRepository.save(any())).thenReturn(new Review(1L, "Test Title", "Test Content", "test_image.jpg"));

        // When
        Long result = reviewService.insertReview(insertDto, userIdx, mockFile);

        // Then
        assertEquals(1L, result);
    }

    @Test
    public void testLikedReviewByReviewId() {
        // Given
        Long reviewIdx = 1L;
        Long userIdx = 2L;
        LikedId likedId = new LikedId();
        likedId.setLikedReviewIdx(reviewIdx);
        likedId.setLikedUsrIdx(userIdx);
        Liked liked = new Liked();
        liked.setId(likedId);

        when(reviewRepository.incrementReviewLike(reviewIdx)).thenReturn(1);
        when(likeRepository.save(any())).thenReturn(liked);

        // When
        boolean result = reviewService.likedReviewByReviewId(reviewIdx, userIdx);

        // Then
        assertTrue(result);
    }

    @Test
    public void testUnlikedReviewByReviewId() {
        // Given
        Long reviewIdx = 1L;
        Long userIdx = 2L;

        when(reviewRepository.reductionReviewLike(reviewIdx)).thenReturn(1);
        doNothing().when(likeRepository).deleteByIdLikedReviewIdxAndIdLikedUsrIdx(reviewIdx, userIdx);

        // When
        boolean result = reviewService.unlikedReviewByReviewId(reviewIdx, userIdx);

        // Then
        assertTrue(result);
    }

}

