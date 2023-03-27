package com.backend.postservice.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class PostTest {
    public Post post;
    public static final Long POST_ID = 1L;
    public static final String DESCRIPTION = "DESCRIPTION";

    @BeforeEach
    void setUp(){
        post = new Post(POST_ID, DESCRIPTION);
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
        Long newId = 2L;
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
