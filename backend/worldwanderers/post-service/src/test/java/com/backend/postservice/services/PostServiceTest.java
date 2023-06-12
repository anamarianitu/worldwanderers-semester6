package com.backend.postservice.services;

import com.backend.postservice.models.Post;
import com.backend.postservice.repositories.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@DataJpaTest
@RunWith(SpringRunner.class)
public class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostService postService;

    private Post post;

    @BeforeEach
    void setUp() {
        String id = "1a2b3c";
        String description = "Description";
        String groupId = "group1";
        String userId = "user1";
        post = new Post(id, description, groupId, userId);
    }

    @Test
    public void getPostByIdTest() {
        when(postRepository.findById("1a2b3c")).thenReturn(Optional.of(post));
        Optional<Post> result = postService.getPostById("1a2b3c");
        assertEquals(post, result.get());
    }

    @Test
    public void getAllPostsTest() {
        List<Post> postList = new ArrayList<>();
        postList.add(post);
        when(postRepository.findAll()).thenReturn(postList);
        List<Post> result = postService.getAllPosts();
        assertEquals(1, result.size());
        assertEquals(post, result.get(0));
    }

    @Test
    public void addPostTest() {
        when(postRepository.save(post)).thenReturn(post);
        Post result = postService.addPost(post);
        assertEquals(post, result);
    }
}
