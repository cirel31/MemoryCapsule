package com.santa.projectservice.service.impl;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.Upload;
import com.santa.projectservice.service.FileUploadService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
@Service
@Slf4j
public class FileUploadServiceImpl implements FileUploadService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;
    public FileUploadServiceImpl(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }


    private static String getUuid() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }


    @Override
    public String upload(MultipartFile file) throws IOException {
        System.out.println("uplodaOnS3도 옴");
        String[] type = file.getOriginalFilename().split("[.]");
        String fileName = getUuid() +"." + type[type.length-1];
        log.info(fileName);
        try {
            PutObjectResult result = amazonS3.putObject(
                    new PutObjectRequest(bucket, fileName, file.getInputStream(), null)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (Exception e){
            log.error(e.toString());
        }
        return fileName;
    }
}
