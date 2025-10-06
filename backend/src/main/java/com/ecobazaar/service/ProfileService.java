package com.ecobazaar.service;

import com.ecobazaar.dto.ProfileResponse;
import com.ecobazaar.dto.ProfileUpdateRequest;
import com.ecobazaar.entity.User;
import com.ecobazaar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // Get user profile
    public ProfileResponse getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        return convertToProfileResponse(user);
    }
    
    // Update user profile
    @Transactional
    public ProfileResponse updateProfile(Long userId, ProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        // Update profile fields
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setEcoCommitment(request.getEcoCommitment());
        user.setNotificationOrders(request.getNotificationOrders());
        user.setNotificationPromotions(request.getNotificationPromotions());
        user.setNotificationSustainability(request.getNotificationSustainability());
        
        User savedUser = userRepository.save(user);
        return convertToProfileResponse(savedUser);
    }
    
    // Update password
    @Transactional
    public void updatePassword(Long userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        // Verify current password
        if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        // Update password
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
    
    // Helper method to convert User to ProfileResponse
    private ProfileResponse convertToProfileResponse(User user) {
        ProfileResponse response = new ProfileResponse();
        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setAddress(user.getAddress());
        response.setEcoCommitment(user.getEcoCommitment());
        response.setNotificationOrders(user.getNotificationOrders());
        response.setNotificationPromotions(user.getNotificationPromotions());
        response.setNotificationSustainability(user.getNotificationSustainability());
        response.setCreatedAt(user.getCreatedAt());
        
        return response;
    }
}
