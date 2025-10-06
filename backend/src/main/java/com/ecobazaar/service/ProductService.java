package com.ecobazaar.service;

import com.ecobazaar.dto.ProductRequest;
import com.ecobazaar.dto.ProductResponse;
import com.ecobazaar.entity.Category;
import com.ecobazaar.entity.Product;
import com.ecobazaar.entity.User;
import com.ecobazaar.repository.CategoryRepository;
import com.ecobazaar.repository.ProductRepository;
import com.ecobazaar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // Get all active products (for customers)
    public Page<ProductResponse> getAllActiveProducts(Pageable pageable) {
        Page<Product> products = productRepository.findByIsActiveTrue(pageable);
        return products.map(this::convertToProductResponse);
    }
    
    // Search products
    public Page<ProductResponse> searchProducts(String query, Pageable pageable) {
        Page<Product> products = productRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(query, pageable);
        return products.map(this::convertToProductResponse);
    }
    
    // Get products by category
    public Page<ProductResponse> getProductsByCategory(Long categoryId, Pageable pageable) {
        Page<Product> products = productRepository.findByCategoryIdAndIsActiveTrue(categoryId, pageable);
        return products.map(this::convertToProductResponse);
    }
    
    // Get product by ID
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return convertToProductResponse(product);
    }
    
    // Get seller's products
    public List<ProductResponse> getSellerProducts(Long sellerId) {
        List<Product> products = productRepository.findBySellerId(sellerId);
        return products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
    }
    
    // Create product (seller only)
    @Transactional
    public ProductResponse createProduct(ProductRequest request, Long sellerId) {
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found with id: " + sellerId));
        
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setStockQuantity(request.getStockQuantity());
        product.setCarbonFootprint(request.getCarbonFootprint());
        product.setIsActive(request.getIsActive());
        product.setSeller(seller);
        
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
            product.setCategory(category);
        }
        
        Product savedProduct = productRepository.save(product);
        return convertToProductResponse(savedProduct);
    }
    
    // Update product (seller only)
    @Transactional
    public ProductResponse updateProduct(Long productId, ProductRequest request, Long sellerId) {
        Product product = productRepository.findByIdAndSellerId(productId, sellerId);
        if (product == null) {
            throw new RuntimeException("Product not found or you don't have permission to edit this product");
        }
        
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setStockQuantity(request.getStockQuantity());
        product.setCarbonFootprint(request.getCarbonFootprint());
        product.setIsActive(request.getIsActive());
        
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
            product.setCategory(category);
        }
        
        Product savedProduct = productRepository.save(product);
        return convertToProductResponse(savedProduct);
    }
    
    // Delete product (seller only)
    @Transactional
    public void deleteProduct(Long productId, Long sellerId) {
        Product product = productRepository.findByIdAndSellerId(productId, sellerId);
        if (product == null) {
            throw new RuntimeException("Product not found or you don't have permission to delete this product");
        }
        
        // Soft delete
        product.setIsActive(false);
        productRepository.save(product);
    }
    
    // Helper method to convert Product to ProductResponse
    private ProductResponse convertToProductResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setImageUrl(product.getImageUrl());
        response.setStockQuantity(product.getStockQuantity());
        response.setCarbonFootprint(product.getCarbonFootprint());
        response.setRating(product.getRating());
        response.setReviewsCount(product.getReviewsCount());
        response.setIsActive(product.getIsActive());
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());
        
        if (product.getCategory() != null) {
            response.setCategory(product.getCategory().getName());
            response.setCategoryId(product.getCategory().getId());
        }
        
        if (product.getSeller() != null) {
            response.setSeller(product.getSeller().getFullName());
            response.setSellerId(product.getSeller().getId());
        }
        
        return response;
    }
}
