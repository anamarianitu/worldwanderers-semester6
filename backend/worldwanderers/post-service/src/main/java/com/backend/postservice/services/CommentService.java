package com.backend.postservice.services;

import com.backend.postservice.exceptions.CommentNotFound;
import com.backend.postservice.models.Comment;
import com.backend.postservice.models.Like;
import com.backend.postservice.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Optional<Comment> getCommentById(String id){
        return commentRepository.findById(id);
    }

    public List<Comment> getAllComments()
    {
        return commentRepository.findAll();
    }

    public Comment addComment(Comment comment)
    {
        return commentRepository.save(comment);
    }

    public boolean removeComment(String id) throws CommentNotFound {
        Optional<Comment> comment = commentRepository.findById(id);
        if (comment.isPresent()) {
            commentRepository.deleteById(id);
            return true;
        } else {
            throw new CommentNotFound("There is not comment with id: " + id);
        }
    }

    public Comment updateComment(String id, String content) throws CommentNotFound {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            Comment commentToUpdate = optionalComment.get();
            commentToUpdate.setComment(content);
            return commentRepository.save(commentToUpdate);
        } else {
            throw new CommentNotFound("Comment not found with id: " + id);
        }
    }

    public List<Comment> getCommentsByPostId(String postId){
        List<Comment> commentsFromPost = new ArrayList<>();

        getAllComments().forEach(comment -> {
            if (Objects.equals(comment.getPostId(), postId)) {
                commentsFromPost.add(comment);
            }
        });

        return commentsFromPost;
    }
}
