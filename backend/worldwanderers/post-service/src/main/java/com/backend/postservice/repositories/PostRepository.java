package com.backend.postservice.repositories;

import com.backend.postservice.models.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PostRepository extends MongoRepository<Post, String> {

    Optional<Post> findById(String id);
}
