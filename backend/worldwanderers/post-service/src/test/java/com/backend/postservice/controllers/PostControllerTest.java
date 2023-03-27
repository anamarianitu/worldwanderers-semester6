package com.backend.postservice.controllers;
import com.backend.postservice.models.Post;
import com.backend.postservice.services.PostService;
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
@SpringBootTest(classes = {PostController.class}, properties = {"spring.main.lazy-initialization=true"})
@ActiveProfiles(value = "test")
@Import(PostController.class)
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    PostService postService;


    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    //  @WithMockUser; will be implemented later
    public void getPostByIdTest() throws Exception {
        //arrange
        Post post = new Post(1L, "Description");
        post.setId(1L);
        Mockito.when(postService.getPostById(post.getId())).thenReturn(Optional.of(post));
        //act
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/posts/{id}",post.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                //assert
                .andExpect(status().isOk());
    }

    @Test
    //  @WithMockUser; will be implemented later
    public void getAllPostsTest() throws Exception {
        //arrange
        Post post1 = new Post(1L, "Description1");
        Post post2 = new Post(2L, "Description2");
        List<Post> posts = new ArrayList<>(Arrays.asList(post1, post2));
        Mockito.when(postService.getAllPosts()).thenReturn(posts);
        //act
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/posts/")
                        .contentType(MediaType.APPLICATION_JSON))
                //assert
                .andExpect(status().isOk());
    }

    @Test
    //  @WithMockUser; will be implemented later
    public void addPostTest() throws Exception {
        //arrange
        Post post = new Post(1L, "Description");
        Mockito.when(postService.addPost(post)).thenReturn(post);
        String requestBody = objectMapper.writeValueAsString(post);
        //act
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/posts/add")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                //assert
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.description").value("Description"));
    }
}
