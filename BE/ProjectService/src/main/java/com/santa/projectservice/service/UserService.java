package com.santa.projectservice.service;

import com.santa.projectservice.jpa.UserEntity;

public interface UserService {
    Iterable<UserEntity> getAllUser();
}
