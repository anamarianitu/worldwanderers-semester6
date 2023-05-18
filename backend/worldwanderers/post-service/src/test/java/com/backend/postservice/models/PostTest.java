package com.backend.postservice.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

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
    public void getIdTest()
    {
        Assert.assertEquals(POST_ID, post.getId());
    }

    @Test
    public void setIdTest()
    {
        //arrange
        String newId = "1a2b3c";
        //act
        post.setId(newId);
        //assert
        Assert.assertEquals(newId, post.getId());
    }

    @Test
    public void getDescriptionTest()
    {
        Assert.assertEquals(DESCRIPTION, post.getDescription());
    }

    @Test
    public void setDescriptionTest()
    {
        //arrange
        String newDescription = "New description";
        //act
        post.setDescription(newDescription);
        //assert
        Assert.assertEquals(newDescription, post.getDescription());
    }
}
