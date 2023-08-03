package com.santa.board.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
//    String upload(MultipartFile file) throws IOException;
    String getFileName(MultipartFile file) throws Exception;
}
