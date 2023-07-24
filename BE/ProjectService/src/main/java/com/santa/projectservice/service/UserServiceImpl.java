package com.santa.projectservice.service;

import com.santa.projectservice.jpa.UserEntity;
import com.santa.projectservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserServiceImpl implements UserService{
    UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Iterable<UserEntity> getAllUser() {
        return userRepository.findAll();
    }
}
