package ru.darksecrets.post.service;

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
import ru.darksecrets.post.model.Post;
import ru.darksecrets.post.repository.PostRepository;
import ru.denis.media.MediaResponse;
import ru.denis.media.MediaUtils;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService {
    @Value("${api.media_server}")
    private String mediaServerUrl;
    @Value("${spring.rabbitmq.queue}")
    private String postQueue;

    private final PostRepository postRepository;
    private final RestTemplate restTemplate;

    public void uploadMedia (MultipartFile file, String postId) {
        String url = mediaServerUrl + "media";
        String fileType = MediaUtils.getFileType(file);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", file.getResource());
        body.add("entityId", postId);
        body.add("callbackTopic", postQueue);
        body.add("orientation", "LANDSCAPE");
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
        Post post = postRepository.findById(String.valueOf(mediaResponse.getEntityId())).orElse(null);
        if (post == null) return;

        if (mediaResponse.getMediaList() == null || mediaResponse.getMediaList().isEmpty()) return;

        if (post.getCover() == null) {
            post.setCover(new ArrayList<>());
        }

        post.getCover().addAll(mediaResponse.getMediaList());
        log.info("Сохранение медиа файла");
        postRepository.save(post);
    }
}
