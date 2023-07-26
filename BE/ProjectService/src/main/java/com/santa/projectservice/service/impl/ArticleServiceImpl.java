package com.santa.projectservice.service.impl;

import com.santa.projectservice.jpa.Article;
import com.santa.projectservice.jpa.ArticleImg;
import com.santa.projectservice.jpa.User;
import com.santa.projectservice.service.ArticleService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Service
public class ArticleServiceImpl implements ArticleService {

    @Override
    public Long writeArticle(Article article, List<MultipartFile> images) {
        return null;
    }

    @Override
    public List<ArticleImg> getImageList(Long id) {
        return null;
    }

    @Override
    public List<Article> articleList(User user) {
        return null;
    }
}
