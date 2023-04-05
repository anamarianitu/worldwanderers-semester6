package com.backend.userservice.services;

import com.backend.userservice.models.User;
import com.backend.userservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }

    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    public User addUser(User user)
    {
        return userRepository.save(user);
    }
}
