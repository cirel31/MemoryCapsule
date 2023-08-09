package com.example.userservice;

import com.example.userservice.model.dto.KakaoDto;
import com.example.userservice.model.entity.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.FriendService;
import com.example.userservice.service.Oauth2Service;
import com.example.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@Slf4j
class UserServiceApplicationTests {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private Oauth2Service oauth2Service;

    @Test
    void contextLoads() {
        ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
        String key = "String key";
        stringStringValueOperations.set(key, "hihi");

        String value = stringStringValueOperations.get(key);
        log.info(value);
        Assertions.assertThat(value).isEqualTo("hihi");
    }

    @Test
    void TestingUser(){
        Optional<User> byId = userRepository.findById(3L);
        Assertions.assertThat(byId.get().isOAuthUser()).isEqualTo(false);
    }

}
