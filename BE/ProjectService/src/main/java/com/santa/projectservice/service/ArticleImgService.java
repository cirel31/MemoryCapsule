package com.santa.projectservice.service;

import com.santa.projectservice.jpa.Article;

public interface ArticleImgService {
    /**
     * 아티클을 만들 때 사진을 같이 넣어줍니다
     */
    void createArticle();

    /**
     * @param id - 아이디!
     * @return - 아티클을 가져옵니다
     * 내가 이해를 잘 하고 있는건지 모르겠네
     */
    Article getArticle(Long id);
}
