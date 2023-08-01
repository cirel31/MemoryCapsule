package com.santa.board.Dto;

import lombok.*;

public class ReviewRequestDTO {

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class InsertDto {
        private String reviewTitle;
        private String reviewContent;
        private String reviewImgUrl;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class ModifyDto {
        private String reviewTitle;
        private String reviewContent;
        private String reviewImgUrl;
        private Long reviewIdx;
    }
}
