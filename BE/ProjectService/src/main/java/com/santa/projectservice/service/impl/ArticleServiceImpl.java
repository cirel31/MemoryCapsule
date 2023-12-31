package com.santa.projectservice.service.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.santa.projectservice.exception.User.UserNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotFoundException;
import com.santa.projectservice.model.dto.ArticleDto;
import com.santa.projectservice.exception.article.ArticleProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotAuthorizedException;
import com.santa.projectservice.model.jpa.*;
import com.santa.projectservice.repository.*;
import com.santa.projectservice.service.ArticleService;
import com.santa.projectservice.service.FileUploadService;
import com.santa.projectservice.repository.util.UtilQuerys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ArticleServiceImpl implements ArticleService {
    private final RegisterRepository registerRepository;
    private final ProjectRepository projectRepository;
    private final ArticleRepository articleRepository;
    private final ArticleImgRepository articleImgRepository;
    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;

    private final JPAQueryFactory queryFactory;
    private QProject qProject = QProject.project;
    private QRegister qRegister = QRegister.register;
    private QArticle qArticle = QArticle.article;
    private QUser qUser = QUser.user;
    private QArticleImg qArticleImg = QArticleImg.articleImg;
    private UtilQuerys utilQuerys;
    public ArticleServiceImpl(ProjectRepository projectRepository, ArticleRepository articleRepository, ArticleImgRepository articleImgRepository,
                              UserRepository userRepository, FileUploadService fileUploadService, JPAQueryFactory queryFactory,
                              RegisterRepository registerRepository, UtilQuerys utilQuerys) {
        this.projectRepository = projectRepository;
        this.articleRepository = articleRepository;
        this.articleImgRepository = articleImgRepository;
        this.fileUploadService = fileUploadService;
        this.userRepository = userRepository;
        this.queryFactory = queryFactory;
        this.registerRepository = registerRepository;
        this.utilQuerys = utilQuerys;
    }


    @Override
    @Transactional
    public Boolean writeArticle(ArticleDto articleDto, List<MultipartFile> images) throws ProjectNotAuthorizedException, ProjectNotFoundException {
        if(!utilQuerys.userProjectValidate(articleDto.getUserId(), articleDto.getProjectId()))
            throw new ProjectNotAuthorizedException("권한이 없는 프로젝트이거나 없는 프로젝트입니다");
        Project project = projectRepository.findById(articleDto.getProjectId()).orElseThrow(() -> new ProjectNotFoundException("없네요?"));
        project.update();
        projectRepository.save(project);

        User writer = userRepository.findById(articleDto.getUserId()).orElseThrow(() -> new UserNotFoundException("유저가 없네요 뭐죠"));
        Article writeArticle = articleRepository.save(Article.builder()
                .project(projectRepository.getReferenceById(articleDto.getProjectId()))
                .user(writer)
                .content(articleDto.getContent())
                .stamp(articleDto.getStamp())
                .build()
        );
        writer.giveArticlePoint();
        userRepository.save(writer);
        try {
            if(images != null) {
                for (int i = 0; i < images.size(); i++) {
                    String url = fileUploadService.upload(images.get(i));
                    articleImgRepository.save(ArticleImg.builder()
                            .article(writeArticle)
                            .order(i)
                            .imgUrl(url)
                            .build()
                    );
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("게시글 작성을 실패했습니다. ", e);
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
    public List<ArticleDto> articleList(Long id) {
        // 특정 유저가 적은 모든 아티클을 가져옵니다
        return articleRepository.findAllByUser_Id(id).stream().map(Article::toDto).collect(Collectors.toList());
    }


        @Override
    public List<ArticleDto> allProjectArticleList(Long userId, Long projectId) {
        List<Article> articleList = articleRepository.findByUser_IdAndProject_Id(userId, projectId);
        List<ArticleDto> results = articleList.stream().map(Article::toDto).collect(Collectors.toList());
        return results;
    }

    @Override
    public ArticleDto recentProjectArticleByUserId(Long userId, Long projectId) throws ArticleProjectNotFoundException {
        Article article = articleRepository.findFirstByUser_IdAndProject_IdOrderByCreatedDesc(userId, projectId)
                .orElseThrow(() -> new ArticleProjectNotFoundException("게시글이 없습니다"));
        return ArticleDto.builder()
                .userId(article.getId())
                .projectId(article.getProject().getId())
                .stamp(article.getStamp())
                .content(article.getContent())
                .title(article.getTitle())
                .created(article.getCreated())
                .build();
    }
}
