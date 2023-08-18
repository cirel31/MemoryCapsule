package com.santa.board.Dto;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ModifyDto {
    @NotNull
    private Long idx;
    @NotNull
    private String Title;
    @NotNull
    private String Content;
}
