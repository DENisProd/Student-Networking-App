package ru.denis.finder.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import ru.denis.finder.model.Media;
import ru.denis.finder.model.UserProfile;
import ru.denis.finder.repository.MediaRepository;
import ru.denis.finder.repository.UserProfileRepository;
import ru.denis.media.MediaDTO;
import ru.denis.media.MediaResponse;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService {
    @Value("${api.media_server}")
    private String mediaServerUrl;

    private final UserProfileRepository userProfileRepository;
    private final MediaRepository mediaRepository;
    private final RestTemplate restTemplate;

    public void uploadMedia (MultipartFile file, Long mediaId) {
        String url = mediaServerUrl + "media";
        String fileType = getFileType(file);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", file.getResource());
        body.add("entityId", mediaId);
        body.add("callbackTopic", "post.media");
        body.add("orientation", "PORTRAIT");
        body.add("type", fileType);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            log.info("Файл успешно принят.");
        } else {
            log.info("Ошибка загрузки: " + response.getStatusCode());
            throw new RuntimeException("Ошибка загрузки файла: " + response.getStatusCode());
        }
    }

    public void addMedia(MediaResponse mediaResponse) {
        if (mediaResponse.getEntityId() == null) return;
        UserProfile userProfile = userProfileRepository.findById(mediaResponse.getEntityId()).orElse(null);
        if (userProfile == null) return;

        if (mediaResponse.getMediaList() == null || mediaResponse.getMediaList().isEmpty()) return;

        List<Media> mediaEntities = mediaResponse.getMediaList().stream()
                .map(this::convertToMedia)
                .toList();

        List<Media> savedMedia = mediaRepository.saveAll(mediaEntities);

        if (userProfile.getMediaList() == null) {
            userProfile.setMediaList(new ArrayList<>());
        }

        userProfile.getMediaList().addAll(savedMedia);
        log.info("Сохранение медиа файла");
        userProfileRepository.save(userProfile);
    }

    private Media convertToMedia(MediaDTO mediaDTO) {
        Media media = new Media();
        media.setFilename(mediaDTO.filename());
        media.setSize(mediaDTO.size());
        return media;
    }

    private String getFileType(MultipartFile file) {
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

    private String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf('.') == -1) {
            return null;
        }
        return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    }
}
