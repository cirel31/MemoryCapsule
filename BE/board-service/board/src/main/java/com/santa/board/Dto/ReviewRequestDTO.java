package com.santa.board.Dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReviewRequestDTO {
    private String reviewTitle;
    private String reviewContent;
    private String reviewImgUrl;
    private Long userIdx;
}
