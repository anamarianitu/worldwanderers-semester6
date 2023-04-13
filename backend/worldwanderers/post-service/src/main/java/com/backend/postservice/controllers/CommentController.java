package com.backend.postservice.controllers;

import com.backend.postservice.exceptions.CommentNotFound;
import com.backend.postservice.models.Comment;
import com.backend.postservice.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Comment>> getCommentById(@PathVariable(value = "id") Long id){
        Optional<Comment> comment = commentService.getCommentById(id);

        if (comment.isPresent()) {
            return new ResponseEntity<>(comment, OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Comment>> getAllComments()
    {
        return new ResponseEntity<>(commentService.getAllComments(), OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment){
        Comment created = commentService.addComment(comment);
        return new ResponseEntity<>(created, CREATED);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeComment(@PathVariable(value = "id") Long id) {
        try {
            boolean removed = commentService.removeComment(id);
            if (removed) {
                return ResponseEntity.ok("Removed successfully.");
            } else {
                return ResponseEntity.status(NOT_FOUND).body("Could not be removed.");
            }
        } catch (CommentNotFound ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable("id") Long id, @RequestBody Comment updatedComment) throws CommentNotFound {
        Optional<Comment> existingComment = commentService.getCommentById(id);
        if(existingComment.isPresent())
        {
            updatedComment.setId(id);
            Comment updated = commentService.updateComment(updatedComment.getId(), updatedComment.getComment());
            return new ResponseEntity<>(updated, OK);
        }
        else
        {
            return new ResponseEntity<>(null, NOT_FOUND);
        }
    }
}
