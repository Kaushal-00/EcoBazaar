package com.ecobazaar.service;

import com.ecobazaar.dto.CartItemRequest;
import com.ecobazaar.dto.CartItemResponse;
import com.ecobazaar.dto.CartResponse;
import com.ecobazaar.entity.Cart;
import com.ecobazaar.entity.CartItem;
import com.ecobazaar.entity.Product;
import com.ecobazaar.entity.User;
import com.ecobazaar.repository.CartItemRepository;
import com.ecobazaar.repository.CartRepository;
import com.ecobazaar.repository.ProductRepository;
import com.ecobazaar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // Get or create cart for user
    @Transactional
    public CartResponse getUserCart(Long userId) {
        Cart cart = cartRepository.findByUserIdWithItems(userId)
                .orElseGet(() -> createCartForUser(userId));
        
        return convertToCartResponse(cart);
    }
    
    // Add item to cart
    @Transactional
    public CartResponse addToCart(Long userId, CartItemRequest request) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> createCartForUser(userId));
        
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + request.getProductId()));
        
        // Check if item already exists in cart
        CartItem existingItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId())
                .orElse(null);
        
        if (existingItem != null) {
            // Update quantity
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
            cartItemRepository.save(existingItem);
        } else {
            // Create new cart item
            CartItem newItem = new CartItem(cart, product, request.getQuantity());
            cart.addItem(newItem);
            cartItemRepository.save(newItem);
        }
        
        cart = cartRepository.save(cart);
        return convertToCartResponse(cart);
    }
    
    // Update cart item quantity
    @Transactional
    public CartResponse updateCartItem(Long userId, Long productId, Integer quantity) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user"));
        
        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (quantity <= 0) {
            cart.removeItem(cartItem);
            cartItemRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        }
        
        cart = cartRepository.save(cart);
        return convertToCartResponse(cart);
    }
    
    // Remove item from cart
    @Transactional
    public CartResponse removeFromCart(Long userId, Long productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user"));
        
        cartItemRepository.deleteByCartIdAndProductId(cart.getId(), productId);
        
        // Refresh cart
        cart = cartRepository.findByUserIdWithItems(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found after removal"));
        
        return convertToCartResponse(cart);
    }
    
    // Clear entire cart
    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
    
    // Helper method to create cart for user
    private Cart createCartForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Cart cart = new Cart(user);
        return cartRepository.save(cart);
    }
    
    // Convert Cart entity to CartResponse DTO
    private CartResponse convertToCartResponse(Cart cart) {
        CartResponse response = new CartResponse();
        response.setId(cart.getId());
        response.setUserId(cart.getUser().getId());
        response.setUpdatedAt(cart.getUpdatedAt());
        
        List<CartItemResponse> items = cart.getCartItems().stream()
                .map(this::convertToCartItemResponse)
                .collect(Collectors.toList());
        
        response.setItems(items);
        
        // Calculate totals
        BigDecimal subtotal = items.stream()
                .map(CartItemResponse::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal totalCarbon = items.stream()
                .map(CartItemResponse::getLineCarbonFootprint)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Integer totalItems = items.stream()
                .mapToInt(CartItemResponse::getQuantity)
                .sum();
        
        response.setSubtotal(subtotal);
        response.setTotalCarbonFootprint(totalCarbon);
        response.setTotalItems(totalItems);
        
        return response;
    }
    
    // Convert CartItem entity to CartItemResponse DTO
    private CartItemResponse convertToCartItemResponse(CartItem cartItem) {
        CartItemResponse response = new CartItemResponse();
        Product product = cartItem.getProduct();
        
        response.setId(cartItem.getId());
        response.setProductId(product.getId());
        response.setProductName(product.getName());
        response.setProductDescription(product.getDescription());
        response.setProductPrice(product.getPrice());
        response.setProductImageUrl(product.getImageUrl());
        response.setProductRating(product.getRating());
        response.setProductReviews(product.getReviewsCount());
        response.setProductCarbonFootprint(product.getCarbonFootprint());
        response.setProductStock(product.getStockQuantity());
        response.setQuantity(cartItem.getQuantity());
        
        if (product.getCategory() != null) {
            response.setProductCategory(product.getCategory().getName());
        }
        
        if (product.getSeller() != null) {
            response.setProductSeller(product.getSeller().getFullName());
        }
        
        // Calculate line totals
        BigDecimal lineTotal = product.getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
        BigDecimal lineCarbonFootprint = product.getCarbonFootprint().multiply(new BigDecimal(cartItem.getQuantity()));
        
        response.setLineTotal(lineTotal);
        response.setLineCarbonFootprint(lineCarbonFootprint);
        
        return response;
    }
}
