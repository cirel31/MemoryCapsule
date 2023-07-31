package com.santa.board.Dto;

import lombok.*;

import java.util.Date;

public class NoticeDTO {
    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class RequestDTO {
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
    public static class ResponseDTO {
        private Long noticeIdx;
        private String noticeTitle;
        private String noticeContent;
        private String noticeImgurl;
        private Date noticeCreated;
        private Integer noticeHit;
    }
}
