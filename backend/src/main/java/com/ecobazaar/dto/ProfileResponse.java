package com.ecobazaar.dto;

import java.time.LocalDateTime;

public class ProfileResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private Boolean ecoCommitment;
    private Boolean notificationOrders;
    private Boolean notificationPromotions;
    private Boolean notificationSustainability;
    private LocalDateTime createdAt;
    
    // Constructors
    public ProfileResponse() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public Boolean getEcoCommitment() { return ecoCommitment; }
    public void setEcoCommitment(Boolean ecoCommitment) { this.ecoCommitment = ecoCommitment; }
    
    public Boolean getNotificationOrders() { return notificationOrders; }
    public void setNotificationOrders(Boolean notificationOrders) { this.notificationOrders = notificationOrders; }
    
    public Boolean getNotificationPromotions() { return notificationPromotions; }
    public void setNotificationPromotions(Boolean notificationPromotions) { this.notificationPromotions = notificationPromotions; }
    
    public Boolean getNotificationSustainability() { return notificationSustainability; }
    public void setNotificationSustainability(Boolean notificationSustainability) { this.notificationSustainability = notificationSustainability; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
