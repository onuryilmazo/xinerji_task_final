package com.onuryilmazo.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;

    // Hashes the password when registering the user
    public User registerUser(String username, String rawPassword) {
        if (userRepository.findByUsername(username) != null) {
            throw new RuntimeException("Username already in use!");
        }
        String hashedPassword = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUsername(username);
        user.setPassword(hashedPassword); 

        return userRepository.save(user);
    }

    // User login process
    public boolean authenticateUser(String username, String rawPassword) {
        // Find the user from the database
        User user = userRepository.findByUsername(username);

        if (user == null) {
            return false; // If the user cannot be found, login fails
        }

        // Compare the entered password with the hashed password in the database
        // if they match, return true, otherwise return false
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
}

