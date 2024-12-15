package ru.denis.media.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.denis.media.repository.FileRepository;

@Service
@RequiredArgsConstructor
public class FileService {
    private FileRepository fileRepository;


}
