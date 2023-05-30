package com.backend.postservice.controllers;

import com.backend.postservice.models.Post;
import com.backend.postservice.services.CommentService;
import com.backend.postservice.services.LikeService;
import com.backend.postservice.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;


    @GetMapping("/")
    public ResponseEntity<List<Post>> getAllPosts(){
        return new ResponseEntity<>(postService.getAllPosts(), OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Post>> getPostById(@PathVariable(value = "id") String id){
        Optional<Post> post = postService.getPostById(id);

        if (post.isPresent()) {
            return new ResponseEntity<>(post, OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<List<Post>> getPostsFromGroup(@PathVariable(value = "id") String groupId){
        return new ResponseEntity<>(postService.getPostsFromGroup(groupId), OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Post>> getPostsOfUser(@PathVariable(value = "id") String userId){
        return new ResponseEntity<>(postService.getPostsOfUser(userId), OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Post> addPost(@RequestBody Post post){
        Post created = postService.addPost(post);
        return new ResponseEntity<>(created, CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable(value = "id") String id){
        Optional<Post> post = postService.getPostById(id);

        if (post.isPresent()) {
            postService.deletePost(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
