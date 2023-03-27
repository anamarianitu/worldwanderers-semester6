package com.backend.likeservice.services;

import com.backend.likeservice.models.Like;
import com.backend.likeservice.repositories.LikeRepository;
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

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@DataJpaTest
@RunWith(SpringRunner.class)
public class LikeServiceTest {

    @Mock
    private LikeRepository likeRepository;

    @InjectMocks
    private LikeService likeService;

    private Like like;

    @BeforeEach
    void setUp(){
        like = new Like(1L, 1L);
    }
    @Test
    public void getLikeByIdTest() {
        when(likeRepository.findById(1L)).thenReturn(Optional.of(like));
        Optional<Like> result = likeService.getLikeById(1L);
        assertEquals(like, result.get());
    }

    @Test
    public void getAllLikesTest() {
        List<Like> likeList = new ArrayList<>();
        likeList.add(like);
        when(likeRepository.findAll()).thenReturn(likeList);
        List<Like> result = likeService.getAllLikes();
        assertEquals(1, result.size());
        assertEquals(like, result.get(0));
    }

    @Test
    public void addLikeTest() {
        when(likeRepository.save(like)).thenReturn(like);
        Like result = likeService.addLike(like);
        assertEquals(like, result);
    }

    @Test
    public void removeLikeTest() {
        when(likeRepository.save(like)).thenReturn(like);
        doNothing().when(likeRepository).deleteById(like.getId());
        Boolean result = likeService.removeLike(like.getId());
        assertEquals(true, result);
    }
}
