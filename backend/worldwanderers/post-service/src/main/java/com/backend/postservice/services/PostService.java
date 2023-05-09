package com.backend.postservice.services;

import com.backend.postservice.models.Post;
import com.backend.postservice.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    public PostRepository postRepository;

    public Optional<Post> getPostById(String id){
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

    public List<Post> getPostsFromGroup(String groupId){
        List<Post> postsFromGroup = new ArrayList<>();

        getAllPosts().forEach(post -> {
            if (Objects.equals(post.getGroupId(), groupId)) {
                postsFromGroup.add(post);
            }
        });

        return postsFromGroup;
    }

    public List<Post> getPostsOfUser(String userId){
        List<Post> postsOfUser = new ArrayList<>();

        getAllPosts().forEach(post -> {
            if (Objects.equals(post.getUserId(), userId)) {
                postsOfUser.add(post);
            }
        });

        return postsOfUser;
    }

}
