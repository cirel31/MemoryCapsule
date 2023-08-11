package com.santa.projectservice.repository.util;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.santa.projectservice.model.dto.ProjectDto;
import com.santa.projectservice.model.jpa.*;
import com.santa.projectservice.model.vo.UserInfo;
import com.santa.projectservice.model.vo.UserVo;
import com.santa.projectservice.repository.ArticleRepository;
import com.santa.projectservice.repository.RegisterRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UtilQuerys {
    private final JPAQueryFactory queryFactory;
    private QProject qProject = QProject.project;
    private QRegister qRegister = QRegister.register;
    private QArticle qArticle = QArticle.article;
    private QUser qUser = QUser.user;
    private QArticleImg qArticleImg = QArticleImg.articleImg;
    private final ArticleRepository articleRepository;
    private final RegisterRepository registerRepository;

    public UtilQuerys(JPAQueryFactory queryFactory,
                      ArticleRepository articleRepository,
                      RegisterRepository registerRepository) {
        this.queryFactory = queryFactory;
        this.articleRepository = articleRepository;
        this.registerRepository = registerRepository;
    }

    public UserInfo userInfo(Long userId){
        return new UserInfo(articleRepository.countAllByUserId(userId), registerRepository.countAllByUser_Id(userId));
    }

    public Long getProjectArticleCount(Long projectId){
        return queryFactory.select(qArticle.count()).from(qArticle).where(qArticle.project.id.eq(projectId)).fetchOne();
    }
    public List<UserVo> projectUserVos(Long projectId){
        return queryFactory
                .select(qRegister.user.name, qRegister.user.nickname, qRegister.user.imgurl)
                .from(qRegister)
                .where(qRegister.project.id.eq(projectId)).fetch()
                .stream()
                .map(tuple -> {
                    log.info("Entity"  + tuple.toString());
                    log.info("name : " + tuple.get(qRegister.user.name).toString());
                    log.info("nickname : " + tuple.get(qRegister.user.name).toString());
                    log.info("imgUrl : " + tuple.get(qRegister.user.imgurl).toString());
                     return UserVo.builder()
                        .name(tuple.get(qRegister.user.name))
                        .nickname(tuple.get(qRegister.user.nickname))
                        .imgUrl(tuple.get(qRegister.user.imgurl))
                        .build();

                })
                .collect(Collectors.toList());
    }

    /*
    프로젝트의 권한이 있는지 확인하는 함수
    QueryDSL의 selectOne과 Limit로 exist명령어와 같은 성능을 냇
     */
    public Boolean userProjectValidate(Long userId,Long projectId){
        return queryFactory.selectOne().from(qRegister)
                .where(qRegister.project.id.eq(projectId),
                        qRegister.user.id.eq(userId))
                .fetchFirst() != null;
    }

    public ProjectDto projectByUserIdAndProjectId(Long userId, Long projectId){
        return queryFactory
                .select(qRegister.project)
                .from(qRegister)
                .where(qRegister.user.id.eq(userId), qRegister.project.id.eq(projectId))
                .fetchFirst()
                .toDto();
    }
    // 현재 프로젝트
    public List<ProjectDto> currentProjects(Long userId){
        return queryFactory.select(qRegister.project).from(qRegister)
                .where(qRegister.user.id.eq(userId), qRegister.project.state.isFalse())
                .fetch()
                .stream().map(Project::toDto).collect(Collectors.toList());
    }
    // 끝난 프로젝트
    public List<ProjectDto> doneProjects(Long userId){
        return queryFactory.select(qRegister.project).from(qRegister)
                .where(qRegister.user.id.eq(userId), qRegister.project.state.isTrue())
                .fetch()
                .stream().map(Project::toDto).collect(Collectors.toList());
    }
    // 모든 프로젝
    public List<ProjectDto> allProjects(Long userId){
        return queryFactory.select(qRegister.project).from(qRegister)
                .where(qRegister.user.id.eq(userId))
                .fetch()
                .stream().map(Project::toDto).collect(Collectors.toList());
    }
}
