package com.santa.projectservice.service.impl;

import com.santa.projectservice.dto.ArticleDto;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.dto.UserDto;
import com.santa.projectservice.jpa.Article;
import com.santa.projectservice.jpa.ArticleImg;
import com.santa.projectservice.jpa.Register;
import com.santa.projectservice.repository.ArticleImgRepository;
import com.santa.projectservice.repository.ArticleRepository;
import com.santa.projectservice.repository.ProjectRepository;
import com.santa.projectservice.repository.UserRepository;
import com.santa.projectservice.service.ArticleService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Service
@Slf4j
public class ArticleServiceImpl implements ArticleService {
    private final ProjectRepository projectRepository;
    private final ArticleRepository articleRepository;
    private final ArticleImgRepository articleImgRepository;
    private final ModelMapper mapper;
    private final UserRepository userRepository;

    public ArticleServiceImpl(ProjectRepository projectRepository, ArticleRepository articleRepository, ArticleImgRepository articleImgRepository,
                              UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.articleRepository = articleRepository;
        this.articleImgRepository = articleImgRepository;
        this.mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        // 매퍼를 통해서 설정해야 하지만 엔티티에 세터가 필요하게 되므로 <- 없다? 생성자로 해주는듯
        // 그냥 생성자를 통해서 Article을 생성해주는게 조금 더 나을 것 같다.
        // 그냥 빌더쓰자
        this.userRepository = userRepository;
    }

    /**
     * @param articleDto - 아티클 정보
     * @param images     - 업로드 이미지들
     * @return
     */
    @Override
    public Boolean writeArticle(ArticleDto articleDto, List<MultipartFile> images) {
        // 내가 하고있는 프로젝트가 맞는지 체크를 하고
        Article article = Article.builder()
                .project(projectRepository.getReferenceById(articleDto.getProjectId()))
                .user(userRepository.getReferenceById(articleDto.getUserId()))
                .content(articleDto.getContent())
                .title(articleDto.getTitle())
                .stamp(articleDto.getStamp())
                .build();
//        이걸 쓰니까 lazy가 걸려있는 article을 조회하게 되므로  select 쿼리가 날라가게 됩니다.
//        log.info(article.toString());
//         예외처리 필요
        articleRepository.save(article);
        // 프로젝트에 내 이름이 있으면 글을 씁니다
        return true;
    }

    @Override
    public List<ArticleImg> getImageList(Long id) {
        // 특정 게시물의 모든 사진을 가져옵니다
        return null;
    }

    @Override
    public List<Article> articleList(Long id) {
        // 특정 유저가 적은 모든 아티클을 가져옵니다
        return null;
    }
}
