package ru.denis.media.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    private final int THREADS_COUNT = 4;

    @Override
    public Executor getAsyncExecutor() {
        return Executors.newFixedThreadPool(THREADS_COUNT);
    }
}
