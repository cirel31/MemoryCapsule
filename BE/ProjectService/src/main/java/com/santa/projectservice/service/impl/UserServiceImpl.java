package com.santa.projectservice.service.impl;

import com.netflix.discovery.converters.Auto;
import com.santa.projectservice.jpa.User;
import com.santa.projectservice.repository.UserRepository;
import com.santa.projectservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Iterable<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User findUserById(Long id) {
        Optional<User> result = userRepository.findById(id);
        // 존재하는 사람이 없으면
        if (!result.isPresent()) {
            return null;
        }
        return result.get();
    }

}
