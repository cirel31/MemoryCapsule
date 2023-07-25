package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
