package com.backend.postservice.repositories;
import com.backend.postservice.models.Post;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles(value = "test")

public class PostRepositoryTest {

    @Mock
    PostRepository postRepository;

    @Test
    public void getPostByIdTest()
    {
        //arrange
        Long id = 1L;
        Post post = new Post(id, "Description");
        //act
        when(postRepository.getById(1L)).thenReturn(post);
        //assert
        Assert.assertEquals(id, postRepository.getById(1L).getId());
    }

    @Test
    public void getAllPostsTest()
    {
        //arrange
        Post post1 = new Post(1L, "Description1");
        Post post2 = new Post(2L, "Description2");
        //act
        when(postRepository.findAll()).thenReturn(Arrays.asList(post1, post2));
        //assert
        Assert.assertEquals(Arrays.asList(post1, post2), postRepository.findAll());
    }

    @Test
    public void addPost()
    {
        //arrange
        Post post = new Post(1L, "Description");
        //act
        when(postRepository.save(any(Post.class))).thenReturn(post);
        //assert
        Assert.assertEquals(post, postRepository.save(post));
    }

    @Test
    public void removePost()
    {
        // arrange
        Post post = new Post(1L, "Description");
        // act
        postRepository.save(post);
        postRepository.deleteById(post.getId());
        // assert
        Assert.assertEquals(Optional.empty(), postRepository.findById(post.getId()));
    }
}
