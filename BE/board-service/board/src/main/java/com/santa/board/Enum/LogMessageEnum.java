package com.santa.board.Enum;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum LogMessageEnum {
    TOTAL_LIST_MESSAGE("%s: 전체 리스트 반환, 정보 : %s"),
    FIND_BY_IDX_MESSAGE("%s: idx의 정보 반환, 정보 : %s"),
    INSERT_ITEM_MESSAGE("%s: 새로운 정보 INSERT, item 정보 : %s, userIdx 정보 : %d"),
    DELETE_ITEM_MESSAGE("%s: idx에 맞는 정보 삭제, 정보 : %s"),
    MODIFY_ITEM_MESSAGE("%s: idx에 맞는 정보 수정, item 정보 : %s"),
    LIKE_ITEM_MESSAGE("%s: 좋아요 클릭, itemIdx : %d, userIdx : %d"),
    UNLIKE_ITEM_MESSAGE("%s: 좋아요 취소, itemIdx : %d, userIdx : %d");

    private String message;

    LogMessageEnum(String message) {
        this.message = message;
    }

    public String getLogMessage(ServiceNameEnum serviceNameEnum, Object object) {
        return String.format(this.message, serviceNameEnum, object.toString());
    }

    public String getLogMessage(ServiceNameEnum serviceNameEnum, Object object, Long itemIdx) {
        return String.format(this.message, serviceNameEnum, object.toString(), itemIdx);
    }

    public String getLogMessage(ServiceNameEnum serviceNameEnum, Long itemIdx1, Long itemIdx2) {
        return String.format(this.message, serviceNameEnum, itemIdx1, itemIdx2);
    }
}
