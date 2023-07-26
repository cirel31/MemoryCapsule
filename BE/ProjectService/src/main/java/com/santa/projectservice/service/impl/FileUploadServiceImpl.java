package com.santa.projectservice.service.impl;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.Upload;
import com.santa.projectservice.service.FileUploadService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
@Service
public class FileUploadServiceImpl implements FileUploadService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    private final AmazonS3 amazonS3;
    public FileUploadServiceImpl(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }
    public String saveFile(MultipartFile multipartFile) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, originalFilename, multipartFile.getInputStream(), metadata);
        return amazonS3.getUrl(bucket, originalFilename).toString();
    }

    public String upload(MultipartFile uploadFile) throws IOException {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(uploadFile.getContentType());
        String originalFileName = uploadFile.getOriginalFilename();
        String now = String.valueOf(System.currentTimeMillis());
        int fileExtensionIndex = originalFileName.lastIndexOf(".");
        String fileName = originalFileName.substring(0, fileExtensionIndex);
        String newFileName = fileName + "." + now ;
        try (InputStream inputStream = uploadFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, newFileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            return "https://ssafysanta.s3.ap-northeast-2.amazonaws.com/"+newFileName;
        } catch (IOException e) {
            System.out.println("파일 에러");
            return "upload함수 에러났슴";
        }
    }

    private static String getUuid() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    private void uploadOnS3(final String findName, final File file) {
        System.out.println("uplodaOnS3도 옴");
        // AWS S3 전송 객체 생성
        final TransferManager transferManager = new TransferManager(this.amazonS3);
        // 요청 객체 생성
        final PutObjectRequest request = new PutObjectRequest(bucket, findName, file);
        // 업로드 시도
        final Upload upload =  transferManager.upload(request);

        try {
            upload.waitForCompletion();
        } catch (AmazonClientException amazonClientException) {
//            log.error(amazonClientException.getMessage());
            System.out.println(amazonClientException.getMessage());
        } catch (InterruptedException e) {
//            log.error(e.getMessage());
            System.out.println(e.getMessage());
        }
    }

}
