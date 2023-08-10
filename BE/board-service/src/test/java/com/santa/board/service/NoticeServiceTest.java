//package com.santa.board.service;
//
//import com.santa.board.Dto.InsertDto;
//import com.santa.board.Dto.ModifyDto;
//import com.santa.board.Dto.NoticeResponseDto;
//import com.santa.board.entity.Notice;
//import com.santa.board.repository.NoticeRepository;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@Transactional
//public class NoticeServiceTest {
//
//    @Autowired
//    private NoticeService noticeService;
//
//    @Autowired
//    private NoticeRepository noticeRepository;
//
//    @Test
//    public void testInsertNotice() throws Exception {
//        // Given
//        InsertDto insertDto = new InsertDto();
//        insertDto.setTitle("Test Notice");
//        insertDto.setContent("This is a test notice content.");
//        MultipartFile mockFile = new MockMultipartFile("test.txt", "Hello, World!".getBytes());
//
//        // When
//        Long result = noticeService.insertNotice(insertDto, 1L, mockFile);
//
//        // Then
//        assertNotNull(result);
//    }
//
//    @Test
//    public void testGetNoticeList() {
//        // Given
//        Pageable pageable = PageRequest.of(0, 10);
//
//        // When
//        Page<NoticeResponseDto> noticeList = noticeService.getNoticeList(pageable);
//
//        // Then
//        assertNotNull(noticeList);
//    }
//
//    @Test
//    public void testGetNoticeDtoById() throws Exception {
//        // Given
//        InsertDto insertDto = new InsertDto();
//        insertDto.setTitle("Test Notice");
//        insertDto.setContent("This is a test notice content.");
//        MultipartFile mockFile = new MockMultipartFile("test.txt", "Hello, World!".getBytes());
//        Long idx = noticeService.insertNotice(insertDto, 1L, mockFile);
//
//        // When
//        NoticeResponseDto noticeDto = noticeService.getNoticeDtoById(idx);
//
//        // Then
//        assertNotNull(noticeDto);
//        assertEquals("Test Notice", noticeDto.getNoticeTitle());
//    }
//
//    @Test
//    public void testDeleteNoticeById() throws Exception {
//        // Given
//        InsertDto insertDto = new InsertDto();
//        insertDto.setTitle("Test Notice");
//        insertDto.setContent("This is a test notice content.");
//        MultipartFile mockFile = new MockMultipartFile("test.txt", "Hello, World!".getBytes());
//        Long newIdx = noticeService.insertNotice(insertDto, 1L, mockFile);
//
//
//        // When
//        noticeService.deleteNoticeById(newIdx);
//        Optional<Notice> deletedNotice = noticeRepository.findById(newIdx);
//
//        // Then
//        assertTrue(deletedNotice.isPresent());
//        assertTrue(deletedNotice.get().getNoticeDeleted());
//    }
//
//    @Test
//    public void testModifyNoticeById() throws Exception {
//        // Given
//        InsertDto insertDto = new InsertDto();
//        insertDto.setTitle("Test Notice");
//        insertDto.setContent("This is a test notice content.");
//        MultipartFile mockFile = new MockMultipartFile("test.txt", "Hello, World!".getBytes());
//        Long idx = noticeService.insertNotice(insertDto, 1L, mockFile);
//
//        ModifyDto modifyDto = new ModifyDto();
//        modifyDto.setIdx(idx);
//        modifyDto.setTitle("Updated Test Notice");
//        modifyDto.setContent("This is an updated test notice content.");
//        MultipartFile updatedMockFile = new MockMultipartFile("updated_test.txt", "Updated Hello, World!".getBytes());
//
//        // When
//        noticeService.modifyNoticeById(modifyDto, updatedMockFile);
//        NoticeResponseDto updatedNoticeDto = noticeService.getNoticeDtoById(idx);
//
//        // Then
//        assertEquals("Updated Test Notice", updatedNoticeDto.getNoticeTitle());
//        assertEquals("This is an updated test notice content.", updatedNoticeDto.getNoticeContent());
//    }
//}
