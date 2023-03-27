package com.backend.commentservice.repositories;

import com.backend.commentservice.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long>  {
    Optional<Comment> findById(Long id);
}
