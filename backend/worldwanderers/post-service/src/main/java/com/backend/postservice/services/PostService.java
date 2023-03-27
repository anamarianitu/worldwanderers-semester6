package com.backend.postservice.services;

import com.backend.postservice.models.Post;
import com.backend.postservice.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    public PostRepository postRepository;

    public Optional<Post> getPostById(Long id){
        return postRepository.findById(id);
    }

    public List<Post> getAllPosts()
    {
        return postRepository.findAll();
    }

    public Post addPost(Post post)
    {
        return postRepository.save(post);
    }
}
