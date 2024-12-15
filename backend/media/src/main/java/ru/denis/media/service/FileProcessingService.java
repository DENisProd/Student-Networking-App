package ru.denis.media.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.denis.media.models.FileOrientation;
import ru.denis.media.models.MediaTypes;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executor;
import java.util.concurrent.LinkedBlockingQueue;

@Service
public class FileProcessingService {

    @Autowired
    private MediaService mediaService;

    private final Executor executor;
    private final BlockingQueue<Runnable> queue;

    public FileProcessingService(Executor executor) {
        this.executor = executor;
        this.queue = new LinkedBlockingQueue<>();
        startFileProcessing();
    }

    private void startFileProcessing() {
        new Thread(() -> {
            while (true) {
                try {
                    Runnable task = queue.take(); // Блокируем, пока не появится задание
                    executor.execute(task); // Обработка задания в пуле потоков
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }).start();
    }

    public void addFileForProcessing(InputStream inputStream, MediaTypes mediaType, FileOrientation orientation, String callbackTopic, Long entityId) throws IOException {
        byte[] data = toByteArray(inputStream);
        ByteArrayInputStream asyncInputStream = new ByteArrayInputStream(data);

        queue.offer(() -> {
            try {
                mediaService.saveMedia(asyncInputStream, mediaType, orientation, callbackTopic, entityId); // Обработка файла
            } catch (IOException e) {
                throw new RuntimeException("Error processing file", e);
            }
        });
    }

    private byte[] toByteArray(InputStream inputStream) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        byte[] temp = new byte[4096];
        int bytesRead;
        while ((bytesRead = inputStream.read(temp)) != -1) {
            buffer.write(temp, 0, bytesRead);
        }
        return buffer.toByteArray();
    }
}
