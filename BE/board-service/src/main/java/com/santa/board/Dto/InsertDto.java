package com.santa.board.Dto;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InsertDto {
    @NotNull
    private String title;
    @NotNull
    private String content;
}
