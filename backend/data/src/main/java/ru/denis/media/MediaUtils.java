package ru.denis.media;

import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

public class MediaUtils {
    public static String getFileType(MultipartFile file) {
        String extension = getFileExtension(file.getOriginalFilename());
        if (extension != null) {
            if (Arrays.asList("mp4", "mkv", "avi", "mov").contains(extension)) {
                return "VIDEO";
            } else if (Arrays.asList("jpg", "jpeg", "png", "gif").contains(extension)) {
                return "IMAGE";
            }
        }
        return "UNKNOWN";
    }

    private static String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf('.') == -1) {
            return null;
        }
        return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    }
}
