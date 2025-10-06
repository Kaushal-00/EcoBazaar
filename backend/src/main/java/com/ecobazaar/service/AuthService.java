package com.ecobazaar.service;

import com.ecobazaar.dto.AuthResponse;
import com.ecobazaar.dto.LoginRequest;
import com.ecobazaar.dto.RegisterRequest;
import com.ecobazaar.entity.Role;
import com.ecobazaar.entity.User;
import com.ecobazaar.repository.RoleRepository;
import com.ecobazaar.repository.UserRepository;
import com.ecobazaar.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Validate role (only CUSTOMER and SELLER can register)
        Role.RoleName roleName;
        try {
            roleName = Role.RoleName.valueOf(request.getRole().toUpperCase());
            if (roleName == Role.RoleName.ADMIN) {
                throw new RuntimeException("Cannot register as ADMIN!");
            }
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + request.getRole());
        }
        
        // Find role entity
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
        
        // Check if user already exists
        Optional<User> existingUser = userRepository.findByEmailWithRoles(request.getEmail());
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            
            // Check if user already has this role
            if (user.hasRole(roleName)) {
                throw new RuntimeException("You are already registered as " + roleName);
            }
            
            // Add new role to existing user
            user.addRole(role);
            User savedUser = userRepository.save(user);
            
            // Generate JWT token for the new role
            String jwt = jwtUtils.generateJwtToken(savedUser.getEmail(), roleName.toString());
            
            return new AuthResponse(jwt, savedUser.getId(), savedUser.getFullName(), 
                    savedUser.getEmail(), roleName.toString(), 
                    "New role added successfully!");
        } else {
            // Create new user
            User user = new User();
            user.setFullName(request.getFullName());
            user.setEmail(request.getEmail());
            user.setPhone(request.getPhone());
            user.setAddress(request.getAddress());
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
            user.setEnabled(true);
            user.addRole(role);
            
            // Save user
            User savedUser = userRepository.save(user);
            
            // Generate JWT token
            String jwt = jwtUtils.generateJwtToken(savedUser.getEmail(), roleName.toString());
            
            return new AuthResponse(jwt, savedUser.getId(), savedUser.getFullName(), 
                    savedUser.getEmail(), roleName.toString(), 
                    "Registration successful!");
        }
    }
    
    public AuthResponse login(LoginRequest request) {
        // Validate requested role
        Role.RoleName requestedRole;
        try {
            requestedRole = Role.RoleName.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + request.getRole());
        }
        
        // Find user by email and verify they have the requested role
        User user = userRepository.findByEmailAndRole(request.getEmail(), requestedRole)
                .orElseThrow(() -> new RuntimeException("Invalid credentials or you don't have " + requestedRole + " role!"));
        
        // Check if user is enabled
        if (!user.getEnabled()) {
            throw new RuntimeException("Account is disabled!");
        }
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password!");
        }
        
        // For admin role, ensure they ONLY have admin role (professional restriction)
        if (requestedRole == Role.RoleName.ADMIN && user.getRoles().size() > 1) {
            throw new RuntimeException("Admin accounts cannot have multiple roles!");
        }
        
        // Generate JWT token for the requested role
        String jwt = jwtUtils.generateJwtToken(user.getEmail(), requestedRole.toString());
        
        return new AuthResponse(jwt, user.getId(), user.getFullName(), 
                user.getEmail(), requestedRole.toString(), 
                "Login successful!");
    }
}
