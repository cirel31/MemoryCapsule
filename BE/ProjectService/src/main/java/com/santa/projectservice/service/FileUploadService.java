package com.santa.projectservice.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileUploadService {
    public String upload(MultipartFile uploadFile) throws IOException;
}
