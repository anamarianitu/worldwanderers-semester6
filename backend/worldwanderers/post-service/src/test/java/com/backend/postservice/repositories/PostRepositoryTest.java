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
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles(value = "test")
public class PostRepositoryTest {

    @Mock
    private PostRepository postRepository;

    @Test
    public void getPostByIdTest() {
        // Arrange
        String id = "1a2b3c";
        String description = "Description";
        String groupId = "group1";
        String userId = "user1";
        Post post = new Post(id, description, groupId, userId);

        // Act
        when(postRepository.findById(id)).thenReturn(Optional.of(post));

        // Assert
        Optional<Post> result = postRepository.findById(id);
        Assert.assertTrue(result.isPresent());
        Assert.assertEquals(post, result.get());
    }

    @Test
    public void getAllPostsTest() {
        // Arrange
        Post post1 = new Post("1a2b3c", "Description1", "group1", "user1");
        Post post2 = new Post("1a2b3c4d", "Description2", "group2", "user2");
        List<Post> posts = Arrays.asList(post1, post2);

        // Act
        when(postRepository.findAll()).thenReturn(posts);

        // Assert
        List<Post> result = postRepository.findAll();
        Assert.assertEquals(posts, result);
    }

    @Test
    public void addPostTest() {
        // Arrange
        String id = "1a2b3c";
        String description = "Description";
        String groupId = "group1";
        String userId = "user1";
        Post post = new Post(id, description, groupId, userId);

        // Act
        when(postRepository.save(any(Post.class))).thenReturn(post);

        // Assert
        Post result = postRepository.save(post);
        Assert.assertEquals(post, result);
    }
}
