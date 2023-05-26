package com.backend.postservice.repositories;

import com.backend.postservice.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends MongoRepository<Comment, String> {
    Optional<Comment> findById(String id);

    List<Comment> findByUserId(String userId);

}
