package com.santa.board.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String getFileName(MultipartFile file) throws Exception;
}
