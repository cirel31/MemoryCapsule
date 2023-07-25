package com.santa.projectservice.service;

import com.santa.projectservice.jpa.ArticleImg;

import java.util.List;

public interface ArticleService {

    // 아티클을 작성하는건데 매핑해서 쓸건지 그냥 쓸건지 고민해봅시다
    Long writeArticle();

    /**
     * @param id - 아티클 아이디
     * @return 아티클의 이미지 리스트
     */
    List<ArticleImg> getImageList(Long id);
}
