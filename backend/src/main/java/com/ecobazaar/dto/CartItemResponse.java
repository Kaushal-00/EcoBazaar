package com.ecobazaar.dto;

import java.math.BigDecimal;

public class CartItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private String productImageUrl;
    private String productCategory;
    private String productSeller;
    private BigDecimal productRating;
    private Integer productReviews;
    private BigDecimal productCarbonFootprint;
    private Integer productStock;
    private Integer quantity;
    private BigDecimal lineTotal;
    private BigDecimal lineCarbonFootprint;
    
    // Constructors
    public CartItemResponse() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    
    public String getProductDescription() { return productDescription; }
    public void setProductDescription(String productDescription) { this.productDescription = productDescription; }
    
    public BigDecimal getProductPrice() { return productPrice; }
    public void setProductPrice(BigDecimal productPrice) { this.productPrice = productPrice; }
    
    public String getProductImageUrl() { return productImageUrl; }
    public void setProductImageUrl(String productImageUrl) { this.productImageUrl = productImageUrl; }
    
    public String getProductCategory() { return productCategory; }
    public void setProductCategory(String productCategory) { this.productCategory = productCategory; }
    
    public String getProductSeller() { return productSeller; }
    public void setProductSeller(String productSeller) { this.productSeller = productSeller; }
    
    public BigDecimal getProductRating() { return productRating; }
    public void setProductRating(BigDecimal productRating) { this.productRating = productRating; }
    
    public Integer getProductReviews() { return productReviews; }
    public void setProductReviews(Integer productReviews) { this.productReviews = productReviews; }
    
    public BigDecimal getProductCarbonFootprint() { return productCarbonFootprint; }
    public void setProductCarbonFootprint(BigDecimal productCarbonFootprint) { this.productCarbonFootprint = productCarbonFootprint; }
    
    public Integer getProductStock() { return productStock; }
    public void setProductStock(Integer productStock) { this.productStock = productStock; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public BigDecimal getLineTotal() { return lineTotal; }
    public void setLineTotal(BigDecimal lineTotal) { this.lineTotal = lineTotal; }
    
    public BigDecimal getLineCarbonFootprint() { return lineCarbonFootprint; }
    public void setLineCarbonFootprint(BigDecimal lineCarbonFootprint) { this.lineCarbonFootprint = lineCarbonFootprint; }
}
