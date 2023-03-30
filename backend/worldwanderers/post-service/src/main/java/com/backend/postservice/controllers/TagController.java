package com.backend.postservice.controllers;

import com.backend.postservice.models.Post;
import com.backend.postservice.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private PostService postService;

    @GetMapping("/")
    public ResponseEntity<List<Post>> getAllPosts(){
        return new ResponseEntity<>(postService.getAllPosts(), OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Post>> getPostById(@PathVariable(value = "id") Long id){
        Optional<Post> post = postService.getPostById(id);

        if (post.isPresent()) {
            return new ResponseEntity<>(post, OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Post> addPost(@RequestBody Post post){
        Post created = postService.addPost(post);
        return new ResponseEntity<>(created, CREATED);
    }
}
