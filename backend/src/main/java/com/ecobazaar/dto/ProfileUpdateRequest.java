package com.ecobazaar.dto;

import jakarta.validation.constraints.NotBlank;

public class ProfileUpdateRequest {
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    private String phone;
    private String address;
    private Boolean ecoCommitment;
    private Boolean notificationOrders;
    private Boolean notificationPromotions;
    private Boolean notificationSustainability;
    
    // Constructors
    public ProfileUpdateRequest() {}
    
    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    
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
}
