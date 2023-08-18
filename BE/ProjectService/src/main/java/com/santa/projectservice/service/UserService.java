package com.santa.projectservice.service;

import com.santa.projectservice.model.dto.UserDto;
import com.santa.projectservice.exception.User.UserNotFoundException;

public interface UserService {
    /*
    유저 정보 세팅하는거는 전부 유저 서비스로 넘김
     */

    // 필요 없음
    // 모든 유저를 다 가져옵니다
    // Iterable<User> getAllUser();

    /*유저 하나의 정보를 가져옵니다*/
    UserDto findUserById(Long id) throws UserNotFoundException;


}
