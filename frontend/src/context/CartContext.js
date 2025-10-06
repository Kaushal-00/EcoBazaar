import React, { createContext, useState, useContext, useEffect } from "react";
import { cartService, authService } from "../services/authService";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get current user
  const getCurrentUserId = () => {
    const userData = authService.getCurrentUser();
    return userData?.id;
  };

  // Load cart from backend
  const loadCart = async () => {
    const userId = getCurrentUserId();
    if (!userId) return;

    try {
      setLoading(true);
      setError("");
      const cartData = await cartService.getUserCart(userId);
      
      // Convert backend cart format to frontend format
      const items = cartData.items?.map(item => ({
        id: item.productId?.toString(),
        name: item.productName,
        price: Number(item.productPrice),
        image: item.productImageUrl,
        rating: Number(item.productRating || 0),
        reviews: item.productReviews || 0,
        carbonFootprint: Number(item.productCarbonFootprint || 0),
        category: item.productCategory?.toLowerCase() || '',
        stock: item.productStock || 0,
        seller: item.productSeller,
        description: item.productDescription,
        quantity: item.quantity
      })) || [];

      setCartItems(items);
    } catch (err) {
      console.error("Error loading cart:", err);
      setError(err.error || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // Add to cart (with backend sync)
  const addToCart = async (product) => {
    const userId = getCurrentUserId();
    if (!userId) {
      setError("Please login to add items to cart");
      return;
    }

    try {
      setLoading(true);
      await cartService.addToCart(userId, product.id, 1);
      
      // Update local state
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prev, { ...product, quantity: 1 }];
        }
      });
      
      setError("");
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError(err.error || "Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  // Remove from cart (with backend sync)
  const removeFromCart = async (productId) => {
    const userId = getCurrentUserId();
    if (!userId) return;

    try {
      setLoading(true);
      await cartService.removeFromCart(userId, productId);
      
      // Update local state
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      setError("");
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError(err.error || "Failed to remove item from cart");
    } finally {
      setLoading(false);
    }
  };

  // Update quantity (with backend sync)
  const updateQuantity = async (productId, quantity) => {
    const userId = getCurrentUserId();
    if (!userId) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      setLoading(true);
      await cartService.updateCartItem(userId, productId, quantity);
      
      // Update local state
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
      
      setError("");
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err.error || "Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    const userId = getCurrentUserId();
    if (!userId) return;

    try {
      setLoading(true);
      await cartService.clearCart(userId);
      setCartItems([]);
      setError("");
    } catch (err) {
      console.error("Error clearing cart:", err);
      setError(err.error || "Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };

  // Load cart on mount and when user changes
  useEffect(() => {
    if (getCurrentUserId()) {
      loadCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        loading,
        error,
        loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
