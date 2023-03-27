package com.backend.likeservice.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;
@RunWith(SpringRunner.class)
public class LikeTest {

    public Like like;
    public static final Long LIKE_ID = 1L;
    public static final Long POST_ID = 1L;
    @BeforeEach
    void setUp(){
        like = new Like(LIKE_ID, POST_ID);
    }

    @Test
    public void getIdTest()
    {
        Assert.assertEquals(LIKE_ID, like.getId());
    }

    @Test
    public void setIdTest()
    {
        //arrange
        Long newId = 2L;
        //act
        like.setId(newId);
        //assert
        Assert.assertEquals(newId, like.getId());
    }

    @Test
    public void getPostIdTest()
    {
        Assert.assertEquals(POST_ID, like.getPostId());
    }

    @Test
    public void setPostIdTest()
    {
        //arrange
        Long newId = 2L;
        //act
        like.setPostId(newId);
        //assert
        Assert.assertEquals(newId, like.getPostId());
    }
}
