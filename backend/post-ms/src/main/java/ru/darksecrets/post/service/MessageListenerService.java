package ru.darksecrets.post.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import ru.denis.media.MediaResponse;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageListenerService {
    private final MediaService mediaService;

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void listen(MediaResponse response) {
        try {
            mediaService.addMedia(response);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
