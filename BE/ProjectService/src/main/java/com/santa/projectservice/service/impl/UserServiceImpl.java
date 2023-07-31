package com.santa.projectservice.service.impl;

import com.santa.projectservice.dto.UserDto;
import com.santa.projectservice.exception.User.UserNotFoundException;
import com.santa.projectservice.jpa.User;
import com.santa.projectservice.repository.UserRepository;
import com.santa.projectservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
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
    public UserDto findUserById(Long id) throws UserNotFoundException {
        Optional<User> result = userRepository.findById(id);
        if (!result.isPresent()) {
            throw new UserNotFoundException(id.toString() + "에 해당하는 유저를 찾을 수 없습니다. ");
        }
        UserDto userDto = mapper.map(result.get(), UserDto.class);
        return userDto;
    }

}
