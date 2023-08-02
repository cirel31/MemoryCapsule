package com.santa.board.Dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InsertDto {
    private String title;
    private String content;
    private String imgurl;
}
