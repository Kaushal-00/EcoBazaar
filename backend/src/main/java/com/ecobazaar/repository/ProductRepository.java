package com.ecobazaar.repository;

import com.ecobazaar.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Find all active products
    Page<Product> findByIsActiveTrue(Pageable pageable);
    
    // Find products by seller
    List<Product> findBySellerIdAndIsActiveTrue(Long sellerId);
    List<Product> findBySellerId(Long sellerId);
    
    // Find products by category
    Page<Product> findByCategoryIdAndIsActiveTrue(Long categoryId, Pageable pageable);
    
    // Search products by name
    Page<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(String name, Pageable pageable);
    
    // Find by seller and product ID
    @Query("SELECT p FROM Product p WHERE p.id = :productId AND p.seller.id = :sellerId")
    Product findByIdAndSellerId(@Param("productId") Long productId, @Param("sellerId") Long sellerId);
}
