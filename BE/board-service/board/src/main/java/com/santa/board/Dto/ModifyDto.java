package com.santa.board.Dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ModifyDto {
    private Long idx;
    private String Title;
    private String Content;
    private String Imgurl;
}
