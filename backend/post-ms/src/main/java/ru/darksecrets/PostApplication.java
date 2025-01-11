package ru.darksecrets;


import jakarta.annotation.PostConstruct;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.darksecrets.post.config.EnvInitializer;

@SpringBootApplication
public class PostApplication
{
    @Autowired
    private RabbitAdmin rabbitAdmin;

    @Autowired
    private Queue queue;

    @PostConstruct
    public void declareQueue() {
        rabbitAdmin.declareQueue(queue);
    }

    public static void main( String[] args )
    {
        new EnvInitializer();
        SpringApplication.run(PostApplication.class, args);
    }
}
