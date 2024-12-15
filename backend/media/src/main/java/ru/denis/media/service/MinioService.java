package ru.denis.media.service;

import io.minio.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ru.denis.media.configuration.MinioClientConfig;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class MinioService {

    private Map<String, Object> uploadToMinio(InputStream inputStream, long fileSize, String fileName, String bucketName, String contentType) {
        Map<String, Object> resultEntity = new HashMap<>();
        try {
            MinioClient minioClient = MinioClientConfig.getMinioClient();

            PutObjectArgs objectArgs = PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(fileName)
                    .stream(inputStream, fileSize, -1)
                    .contentType(contentType != null ? contentType : "application/octet-stream")
                    .build();

            minioClient.putObject(objectArgs);

            resultEntity.put("success", true);
            resultEntity.put("fileName", fileName);
            resultEntity.put("bucketName", bucketName);
        } catch (Exception e) {
            e.printStackTrace();
            resultEntity.put("success", false);
            resultEntity.put("error", e.getMessage());
        }
        return resultEntity;
    }

    // Метод для загрузки файла из ByteArrayOutputStream
    public Map<String, Object> uploadFile(ByteArrayOutputStream byteArrayOutputStream, String fileName, String bucketName, String contentType) {
        InputStream inputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
        long fileSize = byteArrayOutputStream.size();
        return uploadToMinio(inputStream, fileSize, fileName, bucketName, contentType);
    }

    // Метод для загрузки файла из InputStream
    public Map<String, Object> uploadFile(InputStream inputStream, String fileName, String bucketName, String contentType) {
        try {
            long fileSize = inputStream.available();
            return uploadToMinio(inputStream, fileSize, fileName, bucketName, contentType);
        } catch (IOException e) {
            e.printStackTrace();
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("success", false);
            errorResult.put("error", e.getMessage());
            return errorResult;
        }
    }

    public boolean bucketExists(String bucketName) {
        boolean flag = false;
        try {
            flag = MinioClientConfig.bucketExists(bucketName);
            if (flag) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }

    public InputStream getFileInputStream(String fileName, String bucketName) {
        try {
            MinioClient minioClient = MinioClientConfig.getMinioClient();
            return minioClient.getObject(GetObjectArgs.builder().bucket(bucketName).object(fileName).build());
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
        return null;
    }


    public void createBucketName(String bucketName) {
        try {
            if (bucketName.isEmpty()) {
                return;
            }
            MinioClient minioClient = MinioClientConfig.getMinioClient();
            boolean isExist = MinioClientConfig.bucketExists(bucketName);
            if (isExist) {
                log.info("Bucket {} already exists.", bucketName);
            } else {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
    }

    public byte[] getFile(String bucketName, String originalName) {
        try {
            MinioClient minioClient = MinioClientConfig.getMinioClient();

            GetObjectResponse getObjectResponse = minioClient.getObject(
                    GetObjectArgs.builder().bucket(bucketName).object(originalName).build()
            );

            byte[] fileContent = getObjectResponse.readAllBytes();

            String mimeType = URLConnection.guessContentTypeFromName(originalName);
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }

            return fileContent;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void deleteBucketName(String bucketName) {
        try {
            if (bucketName.isEmpty()) {
                return;
            }
            MinioClient minioClient = MinioClientConfig.getMinioClient();
            boolean isExist = MinioClientConfig.bucketExists(bucketName);
            if (isExist) {
                minioClient.removeBucket(RemoveBucketArgs.builder().bucket(bucketName).build());
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
    }

    public void deleteBucketFile(String bucketName) {
        try {
            if (bucketName.isEmpty()) {
                return;
            }
            MinioClient minioClient = MinioClientConfig.getMinioClient();
            boolean isExist = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
            if (isExist) {
                minioClient.deleteBucketEncryption(DeleteBucketEncryptionArgs.builder().bucket(bucketName).build());
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
    }

    public String getPreviewFileUrl(String bucketName, String fileName) {
        try {
            MinioClient minioClient = MinioClientConfig.getMinioClient();
            return minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder().bucket(bucketName).object(fileName).build());
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}
