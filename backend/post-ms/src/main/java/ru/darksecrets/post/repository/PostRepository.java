package ru.darksecrets.post.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ru.darksecrets.post.model.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
}
