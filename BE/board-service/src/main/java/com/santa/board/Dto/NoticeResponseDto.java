package com.santa.board.Dto;

import com.santa.board.entity.Notice;
import lombok.*;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NoticeResponseDto {
    private Long noticeIdx;
    private String noticeTitle;
    private String noticeContent;
    private String noticeImgurl;
    private Date noticeCreated;
    private Integer noticeHit;

    public List<NoticeResponseDto> toDtoList(Page<Notice> noticePage) {
        List<NoticeResponseDto> responseDTOList = noticePage.map(notice -> NoticeResponseDto.builder()
                .noticeIdx(notice.getNoticeIdx())
                .noticeTitle(notice.getNoticeTitle())
                .noticeContent(notice.getNoticeContent())
                .noticeImgurl(notice.getNoticeImgurl())
                .noticeCreated(notice.getNoticeCreated())
                .noticeHit(notice.getNoticeHit())
                .build()).stream().collect(Collectors.toList());
        return responseDTOList;
    }
    public NoticeResponseDto toDto(Notice notice) {
        NoticeResponseDto responseDTO = NoticeResponseDto.builder()
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