package com.example.userservice;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
@Slf4j
class UserServiceApplicationTests {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Test
    void contextLoads() {
        ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
        String key = "String key";
        stringStringValueOperations.set(key, "hihi");

        String value = stringStringValueOperations.get(key);
        log.info(value);
        Assertions.assertThat(value).isEqualTo("hihi");
    }

}
