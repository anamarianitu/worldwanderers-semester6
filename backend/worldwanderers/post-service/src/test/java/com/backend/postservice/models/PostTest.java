package com.backend.postservice.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;

@RunWith(SpringRunner.class)
public class PostTest {
    public Post post;
    public static final String POST_ID = "1a2b";
    public static final String GROUP_ID = "group1";
    public static final String USER_ID = "user1";
    public static final String DESCRIPTION = "DESCRIPTION";

    @BeforeEach
    void setUp(){
        post = new Post(POST_ID, DESCRIPTION, GROUP_ID, USER_ID);
    }

    @Test
    public void getIdTest() {
        Assert.assertEquals(POST_ID, post.getId());
    }

    @Test
    public void setIdTest() {
        // Arrange
        String newId = "1a2b3c";

        // Act
        post.setId(newId);

        // Assert
        Assert.assertEquals(newId, post.getId());
    }

    @Test
    public void getDescriptionTest() {
        Assert.assertEquals(DESCRIPTION, post.getDescription());
    }

    @Test
    public void setDescriptionTest() {
        // Arrange
        String newDescription = "New description";

        // Act
        post.setDescription(newDescription);

        // Assert
        Assert.assertEquals(newDescription, post.getDescription());
    }

    @Test
    public void getGroupIdTest() {
        Assert.assertEquals(GROUP_ID, post.getGroupId());
    }

    @Test
    public void setGroupIdTest() {
        // Arrange
        String newGroupId = "newGroup1";

        // Act
        post.setGroupId(newGroupId);

        // Assert
        Assert.assertEquals(newGroupId, post.getGroupId());
    }

    @Test
    public void getUserIdTest() {
        Assert.assertEquals(USER_ID, post.getUserId());
    }

    @Test
    public void setUserIdTest() {
        // Arrange
        String newUserId = "newUser1";

        // Act
        post.setUserId(newUserId);

        // Assert
        Assert.assertEquals(newUserId, post.getUserId());
    }

    @Test
    public void setCreatedAtTest() {
        // Arrange
        LocalDateTime createdAt = LocalDateTime.now();

        // Act
        post.setCreatedAt(createdAt);

        // Assert
        Assert.assertEquals(createdAt, post.getCreatedAt());
    }

    @Test
    public void getUpdatedAtTest() {
        Assert.assertNull(post.getUpdatedAt());
    }

    @Test
    public void setUpdatedAtTest() {
        // Arrange
        LocalDateTime updatedAt = LocalDateTime.now();

        // Act
        post.setUpdatedAt(updatedAt);

        // Assert
        Assert.assertEquals(updatedAt, post.getUpdatedAt());
    }

    @Test
    public void equalsTest() {
        // Arrange
        Post post2 = new Post(POST_ID, DESCRIPTION, GROUP_ID, USER_ID);
        Post post3 = new Post("xyz", "Different Description", GROUP_ID, USER_ID);

        // Assert
        Assert.assertEquals(post, post2);
        Assert.assertNotEquals(post, post3);
    }

    @Test
    public void toStringTest() {
        // Arrange
        String expectedToString = "Post{id=1a2b, header=DESCRIPTION, description=";

        // Act
        String actualToString = post.toString();

        // Assert
        Assert.assertTrue(actualToString.startsWith(expectedToString));
    }
}
