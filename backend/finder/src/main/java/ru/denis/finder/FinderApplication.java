package ru.denis.finder;

import jakarta.annotation.PostConstruct;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.denis.finder.configuration.EnvInitializer;

@SpringBootApplication
public class FinderApplication {

    @Autowired
    private RabbitAdmin rabbitAdmin;

    @Autowired
    private Queue queue;

    @PostConstruct
    public void declareQueue() {
        rabbitAdmin.declareQueue(queue);
    }

    public static void main(String[] args) {
        new EnvInitializer();
        SpringApplication.run(FinderApplication.class, args);
    }
}
