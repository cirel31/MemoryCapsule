package com.santa.projectservice.service;

import com.santa.projectservice.jpa.Article;
import com.santa.projectservice.jpa.ArticleImg;
import com.santa.projectservice.jpa.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ArticleService {

    /**
     * 아티클을 생성한다
     *
     * @param article - 아티클 정보
     * @param images - 업로드 이미지들
     * @return - 아티클의 ID
     */
    // 아티클을 작성하는데 아티클을 생성하고 그 아이디로 사진을 전부 넣어줘야 함
    Long writeArticle(Article article, List<MultipartFile> images);

    /**
     * 한 아티클의 이미지 리스트를 가져옴
     * @param id - 아티클 아이디
     * @return 아티클의 이미지 리스트
     */
    List<ArticleImg> getImageList(Long id);

    /**
     * 한 사람이 작성한 모든 아티클 반환
     * @param user - 유저
     * @return - 그 사람이 작성한 모든 아티클
     */
    List<Article> articleList(User user);
}
