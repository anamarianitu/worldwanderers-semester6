package com.backend.userservice.services;

import com.backend.userservice.models.User;
import com.backend.userservice.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User("1a2b3c", "John", "Doe", "johndoe", "john@example.com", "password");
    }

    @Test
    public void getUserByIdTest() {
        // Arrange
        when(userRepository.findById("1a2b3c")).thenReturn(Optional.of(user));

        // Act
        Optional<User> result = userService.getUserById("1a2b3c");

        // Assert
        assertTrue(result.isPresent());
        assertEquals(user, result.get());
    }

    @Test
    public void getAllUsersTest() {
        // Arrange
        List<User> userList = new ArrayList<>();
        userList.add(user);
        when(userRepository.findAll()).thenReturn(userList);

        // Act
        List<User> result = userService.getAllUsers();

        // Assert
        assertEquals(1, result.size());
        assertEquals(user, result.get(0));
    }

    @Test
    public void addUserTest() {
        // Arrange
        when(userRepository.save(user)).thenReturn(user);

        // Act
        User result = userService.addUser(user);

        // Assert
        assertEquals(user, result);
    }

    @Test
    public void deleteUserTest() {
        // Arrange & Act
        userService.deleteUser("1a2b3c");

        // Assert
        Mockito.verify(userRepository, Mockito.times(1)).deleteById("1a2b3c");
    }
}

