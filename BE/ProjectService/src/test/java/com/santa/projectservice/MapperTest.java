package com.santa.projectservice;

import com.santa.projectservice.dto.ArticleDto;
import com.santa.projectservice.jpa.Article;
import com.santa.projectservice.mapper.ArticleMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@Slf4j
@ExtendWith(SpringExtension.class)
public class MapperTest {
    ArticleMapper articleMapper = ArticleMapper.INSTANCE;

    @Test
    public void 매퍼_테스트(){
        ArticleDto articleDto = ArticleDto.builder()
                .title("우하하하")
                .content("하하하하하")
                .userId(1L)
                .build();
        Article article = articleMapper.toEntity(articleDto);
        System.out.println(article.toString());

    }
}
