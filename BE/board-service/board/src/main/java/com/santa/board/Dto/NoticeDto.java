package com.santa.board.Dto;

import lombok.*;

import java.time.LocalDateTime;

public class NoticeDto {
    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class NoticeRequestDTO {
        private Long idx;
        private String noticeTitle;
        private String noticeContent;
        private String noticeImgurl;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class NoticeResponseDTO {
        private Long noticeIdx;
        private String noticeTitle;
        private String noticeContent;
        private String noticeImgurl;
        private LocalDateTime noticeCreated;
        private Integer noticeHit;
    }
}
