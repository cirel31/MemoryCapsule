package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.ArticleImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleImgRepository extends JpaRepository<ArticleImg, Long> {
    public List<ArticleImg> findAllByArticle_Id(Long id);
}
