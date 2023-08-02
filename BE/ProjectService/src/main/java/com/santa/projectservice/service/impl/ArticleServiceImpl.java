package com.santa.projectservice.service.impl;

import com.santa.projectservice.dto.ArticleDto;
import com.santa.projectservice.exception.article.ArticleProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotAuthorizedException;
import com.santa.projectservice.jpa.Article;
import com.santa.projectservice.jpa.ArticleImg;
import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.repository.ArticleImgRepository;
import com.santa.projectservice.repository.ArticleRepository;
import com.santa.projectservice.repository.ProjectRepository;
import com.santa.projectservice.repository.UserRepository;
import com.santa.projectservice.service.ArticleService;
import com.santa.projectservice.service.FileUploadService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ArticleServiceImpl implements ArticleService {
    private final ProjectRepository projectRepository;
    private final ArticleRepository articleRepository;
    private final ArticleImgRepository articleImgRepository;
    private final ModelMapper mapper;
    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;

    public ArticleServiceImpl(ProjectRepository projectRepository, ArticleRepository articleRepository, ArticleImgRepository articleImgRepository,
                              UserRepository userRepository, FileUploadService fileUploadService) {
        this.projectRepository = projectRepository;
        this.articleRepository = articleRepository;
        this.articleImgRepository = articleImgRepository;
        this.fileUploadService = fileUploadService;
        this.mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        this.userRepository = userRepository;
    }

    /**
     * @param articleDto - 아티클 정보
     * @param images     - 업로드 이미지들
     * @return
     */
    @Override
    @Transactional
    public Boolean writeArticle(ArticleDto articleDto, List<MultipartFile> images) throws ProjectNotAuthorizedException {
        Optional<Project> project = projectRepository.findById(articleDto.getProjectId());
        if(!project.isPresent()){
            throw new ProjectNotAuthorizedException("권한이 없는 프로젝트이거나 없는 프로젝트입니다");
        }
        Article article = Article.builder()
                .project(projectRepository.getReferenceById(articleDto.getProjectId()))
                .user(userRepository.getReferenceById(articleDto.getUserId()))
                .content(articleDto.getContent())
                .title(articleDto.getTitle())
                .stamp(articleDto.getStamp())
                .build();
        Article writeArticle = articleRepository.save(article);
        if(images != null) {
            images.forEach(file -> {
                try {
                    String url = fileUploadService.upload(file);
                    articleImgRepository.save(ArticleImg.builder()
                            .article(writeArticle)
                            .imgurl(url)
                            .build()
                    );
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
        }
        return true;
    }

    @Override
    public List<ArticleImg> getImageList(Long id) {
        List<ArticleImg> allByArticle_id = articleImgRepository.findAllByArticle_Id(id);
        return allByArticle_id;
        // 특정 게시물의 모든 사진을 가져옵니다
    }

    @Override
    public List<Article> articleList(Long id) {
        // 특정 유저가 적은 모든 아티클을 가져옵니다
        List<Article> allByUser_id = articleRepository.findAllByUser_Id(id);
        return allByUser_id;
    }

    @Override
    public List<ArticleDto> allProjectArticleList(Long userId, Long projectId) {
        List<Article> articleList = articleRepository.findByUser_IdAndProject_Id(userId, projectId);
        List<ArticleDto> resultList = new ArrayList<>();
        for(Article article : articleList){
            resultList.add(ArticleDto.builder()
                            .userId(article.getId())
                            .projectId(article.getProject().getId())
                            .stamp(article.getStamp())
                            .content(article.getContent())
                            .title(article.getTitle())
                            .created(article.getCreated())
                    .build());
        }
        return resultList;
    }

    @Override
    public ArticleDto recentProjectArticleByUserId(Long userId, Long projectId) throws ArticleProjectNotFoundException {
        Optional<Article> article = articleRepository.findFirstByUser_IdAndProject_IdOrderByCreatedDesc(userId, projectId);
        if(!article.isPresent()){
            throw new ArticleProjectNotFoundException("게시글이 없습니다");
        }
        ArticleDto articleDto = ArticleDto.builder()
                .userId(article.get().getId())
                .projectId(article.get().getProject().getId())
                .stamp(article.get().getStamp())
                .content(article.get().getContent())
                .title(article.get().getTitle())
                .created(article.get().getCreated())
                .build();
        return articleDto;
    }
}