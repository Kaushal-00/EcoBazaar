package com.ecobazaar.controller;

import com.ecobazaar.dto.ProductRequest;
import com.ecobazaar.dto.ProductResponse;
import com.ecobazaar.service.ProductService;
import com.ecobazaar.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private AuthService authService;
    
    // Test endpoint
    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> testProductsEndpoint() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Products API is working!");
        response.put("timestamp", java.time.LocalDateTime.now());
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
    
    // Get all active products (for customers)
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId) {
        
        try {
            Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            
            Pageable pageable = PageRequest.of(page, size, sort);
            Page<ProductResponse> products;
            
            if (search != null && !search.trim().isEmpty()) {
                products = productService.searchProducts(search, pageable);
            } else if (categoryId != null) {
                products = productService.getProductsByCategory(categoryId, pageable);
            } else {
                products = productService.getAllActiveProducts(pageable);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("products", products.getContent());
            response.put("currentPage", products.getNumber());
            response.put("totalItems", products.getTotalElements());
            response.put("totalPages", products.getTotalPages());
            response.put("hasNext", products.hasNext());
            response.put("hasPrevious", products.hasPrevious());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch products");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable Long id) {
        try {
            ProductResponse product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get seller's products
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<ProductResponse>> getSellerProducts(@PathVariable Long sellerId) {
        List<ProductResponse> products = productService.getSellerProducts(sellerId);
        return ResponseEntity.ok(products);
    }
    
    // Create product (seller only)
    @PostMapping("/seller/{sellerId}")
    public ResponseEntity<?> createProduct(
            @PathVariable Long sellerId,
            @Valid @RequestBody ProductRequest request) {
        try {
            ProductResponse product = productService.createProduct(request, sellerId);
            return ResponseEntity.status(201).body(product);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    // Update product (seller only)
    @PutMapping("/{productId}/seller/{sellerId}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long productId,
            @PathVariable Long sellerId,
            @Valid @RequestBody ProductRequest request) {
        try {
            ProductResponse product = productService.updateProduct(productId, request, sellerId);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    // Delete product (seller only)
    @DeleteMapping("/{productId}/seller/{sellerId}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable Long productId,
            @PathVariable Long sellerId) {
        try {
            productService.deleteProduct(productId, sellerId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Product deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
