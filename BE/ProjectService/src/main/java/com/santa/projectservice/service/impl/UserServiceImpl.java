package com.santa.projectservice.service.impl;

import com.netflix.discovery.converters.Auto;
import com.santa.projectservice.dto.UserDto;
import com.santa.projectservice.jpa.User;
import com.santa.projectservice.repository.UserRepository;
import com.santa.projectservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    ModelMapper mapper;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    }



    @Override
    public UserDto findUserById(Long id) {
        Optional<User> result = userRepository.findById(id);
        // 존재하는 사람이 없으면
        if (!result.isPresent()) {
            return null;
        }
        UserDto userDto = mapper.map(result.get(), UserDto.class);
        return userDto;
    }

}
