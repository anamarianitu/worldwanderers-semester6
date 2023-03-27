package com.backend.likeservice.repositories;
import com.backend.likeservice.models.Like;
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
public class LikeRepositoryTest {

    @Mock
    LikeRepository likeRepository;

    @Test
    public void getLikeByIdTest()
    {
        //arrange
        Long id = 1L;
        Like like = new Like(id, 1L);
        //act
        when(likeRepository.getById(1L)).thenReturn(like);
        //assert
        Assert.assertEquals(id, likeRepository.getById(1L).getId());
    }

    @Test
    public void getAllLikesTest()
    {
        //arrange
        Like like1 = new Like(1L, 1L);
        Like like2 = new Like(2L, 1L);
        //act
        when(likeRepository.findAll()).thenReturn(Arrays.asList(like1, like2));
        //assert
        Assert.assertEquals(Arrays.asList(like1, like2), likeRepository.findAll());
    }

    @Test
    public void addLike()
    {
        //arrange
        Like like = new Like(1L, 1L);
        //act
        when(likeRepository.save(any(Like.class))).thenReturn(like);
        //assert
        Assert.assertEquals(like, likeRepository.save(like));
    }

    @Test
    public void removeLike()
    {
        // arrange
        Like like = new Like(1L, 1L);
        // act
        likeRepository.save(like);
        likeRepository.deleteById(like.getId());
        // assert
        Assert.assertEquals(Optional.empty(), likeRepository.findById(like.getId()));
    }
}
