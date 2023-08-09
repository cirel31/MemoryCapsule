package com.example.userservice.model.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum FriendType {
    NO_FRIEND(0),
    FRIEND(1),
    COME_REQUEST(3),
    SEND_REQUEST(2);

    int code;
}
