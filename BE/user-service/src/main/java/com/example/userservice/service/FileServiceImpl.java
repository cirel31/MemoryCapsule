package com.example.userservice.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileServiceImpl implements FileService{
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;


    private String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    @Override
    public String upload(MultipartFile file) throws IOException {
        String[] type = file.getOriginalFilename().split("[.]");
        String fileName = getUUID() +"." + type[type.length-1];
        log.info(fileName);
        try {
            // 메타데이터 설정
            // 해당 설정이 없으면 "application/octet-stream"으로 설정되어 객체에 접근할때 다운로드 페이지가 뜬다
            // ContentType을 반드시 사진에서 추출해서 사용하도록 하자
            ObjectMetadata om = new ObjectMetadata();
            om.setContentType(file.getContentType());
            om.setContentLength(file.getBytes().length);
            PutObjectResult result = amazonS3.putObject(
                    new PutObjectRequest(bucket, fileName, file.getInputStream(), om)
            );
        } catch (AmazonServiceException e){
            log.error(e.getMessage());
            return "FAIL";
        } catch (SdkClientException e) {
            log.error(e.getMessage());
            return "FAIL";
        }
        return fileName;
    }
}
