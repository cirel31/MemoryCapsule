package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    public List<Article> findAllByUser_Id(Long id);
}
