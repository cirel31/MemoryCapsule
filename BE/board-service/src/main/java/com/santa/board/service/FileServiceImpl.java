package com.santa.board.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.santa.board.Enum.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileServiceImpl implements FileService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${S3Url}")
    private String defaultUrl;

    private final AmazonS3 amazonS3;

    public String getFileName(MultipartFile file) throws Exception  {
        if (file.isEmpty()) return null;
        return defaultUrl + upload(file);
    }

    private String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    private String upload(MultipartFile file) throws IOException {
        String[] type = file.getOriginalFilename().split("[.]");
        String fileName = getUUID() +"." + type[type.length-1];
        log.info(fileName);
        try(InputStream inputStream = file.getInputStream()) {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(file.getContentType());
            objectMetadata.setContentLength(file.getBytes().length);
            PutObjectResult result = amazonS3.putObject(
                    new PutObjectRequest(bucket, fileName, file.getInputStream(), objectMetadata)
            );
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (AmazonServiceException e){
            log.error(e.getMessage());
            return ResponseStatus.ERROR.name();
        } catch (SdkClientException e) {
            log.error(e.getMessage());
            return ResponseStatus.ERROR.name();
        }
        return fileName;
    }

}
