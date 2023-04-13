package com.backend.postservice.services;

import com.backend.postservice.exceptions.CommentNotFound;
import com.backend.postservice.models.Comment;
import com.backend.postservice.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Optional<Comment> getCommentById(Long id){
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

    public boolean removeComment(Long id) throws CommentNotFound {
        Optional<Comment> comment = commentRepository.findById(id);
        if (comment.isPresent()) {
            commentRepository.deleteById(id);
            return true;
        } else {
            throw new CommentNotFound("There is not comment with id: " + id);
        }
    }

    public Comment updateComment(Long id, String content) throws CommentNotFound {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            Comment commentToUpdate = optionalComment.get();
            commentToUpdate.setComment(content);
            return commentRepository.save(commentToUpdate);
        } else {
            throw new CommentNotFound("Comment not found with id: " + id);
        }
    }
}
