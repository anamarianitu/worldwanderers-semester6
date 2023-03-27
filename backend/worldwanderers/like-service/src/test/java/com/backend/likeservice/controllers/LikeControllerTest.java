package com.backend.likeservice.controllers;
import com.backend.likeservice.models.Like;
import com.backend.likeservice.services.LikeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@EnableAutoConfiguration
@AutoConfigureMockMvc
@SpringBootTest(classes = {LikeController.class}, properties = {"spring.main.lazy-initialization=true"})
@ActiveProfiles(value = "test")
@Import(LikeController.class)

public class LikeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    LikeService likeService;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    //  @WithMockUser; will be implemented later
    public void getLikeByIdTest() throws Exception {
        //arrange
        Like like = new Like(1L, 1L);
        Mockito.when(likeService.getLikeById(like.getId())).thenReturn(Optional.of(like));
        //act
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/likes/{id}",like.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                //assert
                .andExpect(status().isOk());
    }

    @Test
    //  @WithMockUser; will be implemented later
    public void getAllLikesTest() throws Exception {
        //arrange
        Like like1 = new Like(1L, 1L);
        Like like2 = new Like(2L, 1L);
        List<Like> likes = new ArrayList<>(Arrays.asList(like1, like2));
        Mockito.when(likeService.getAllLikes()).thenReturn(likes);
        //act
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/likes/")
                        .contentType(MediaType.APPLICATION_JSON))
                //assert
                .andExpect(status().isOk());
    }

    @Test
    //  @WithMockUser; will be implemented later
    public void addLikeTest() throws Exception {
        //arrange
        Like like = new Like(1L, 1L);
        Mockito.when(likeService.addLike(like)).thenReturn(like);
        String requestBody = objectMapper.writeValueAsString(like);
        //act
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/likes/add")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                //assert
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.postId").value(1L));
    }

    @Test
    //  @WithMockUser; will be implemented later
    public void removeLikeTest() throws Exception {
        //arrange
        Like like = new Like(1L, 1L);
        Mockito.when(likeService.removeLike(like.getId())).thenReturn(true);
        //act
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/likes/remove/{id}",like.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                //assert
                .andExpect(status().isOk())
                .andExpect(content().string("Removed successfully."));
    }
}
