package com.santa.board.Dto;

import com.santa.board.entity.Notice;
import lombok.*;
import org.springframework.data.domain.Page;

import java.util.Date;
public class NoticeDTO {
    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class RequestInsertDTO {
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

        public Page<ResponseDTO> toDtoList(Page<Notice> noticePage) {
            Page<ResponseDTO> responseDTOPage = noticePage.map(notice -> ResponseDTO.builder()
                    .noticeIdx(notice.getNoticeIdx())
                    .noticeTitle(notice.getNoticeTitle())
                    .noticeContent(notice.getNoticeContent())
                    .noticeImgurl(notice.getNoticeImgurl())
                    .noticeCreated(notice.getNoticeCreated())
                    .noticeHit(notice.getNoticeHit())
                    .build());
            return responseDTOPage;
        }
        public ResponseDTO toDto(Notice notice) {
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .noticeIdx(notice.getNoticeIdx())
                    .noticeTitle(notice.getNoticeTitle())
                    .noticeContent(notice.getNoticeContent())
                    .noticeImgurl(notice.getNoticeImgurl())
                    .noticeCreated(notice.getNoticeCreated())
                    .noticeHit(notice.getNoticeHit())
                    .build();
            return responseDTO;
        }
    }
}
