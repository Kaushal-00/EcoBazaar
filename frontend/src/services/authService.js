// src/services/authService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ------------------ Token Management ------------------
export const tokenService = {
  setToken: (token) => {
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  getToken: () => localStorage.getItem('authToken'),

  removeToken: () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  },

  setUserData: (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
  },

  getUserData: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  clearUserData: () => {
    localStorage.removeItem('userData');
  },
};

// ------------------ Auth Service ------------------
export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', {
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        password: userData.password,
        role: userData.role.toUpperCase(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Registration failed' };
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
        role: credentials.role,
      });

      if (response.data.token) {
        tokenService.setToken(response.data.token);
        tokenService.setUserData({
          id: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          role: response.data.role,
        });
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Login failed' };
    }
  },

  logout: () => {
    tokenService.removeToken();
    tokenService.clearUserData();
  },

  isAuthenticated: () => !!tokenService.getToken(),

  getCurrentUser: () => tokenService.getUserData(),
};

// ------------------ Product Service ------------------
export const productService = {
  getAllProducts: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          queryParams.append(key, params[key]);
        }
      });
      
      console.log('Making API call to:', `/products?${queryParams}`);
      const response = await api.get(`/products?${queryParams}`);
      console.log('API Response received:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('API Error Details:');
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('Headers:', error.response?.headers);
      
      throw error.response?.data || { 
        error: `Failed to fetch products (${error.response?.status || 'Network Error'})` 
      };
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error.response?.data || { error: 'Failed to fetch product' };
    }
  },

  getSellerProducts: async (sellerId) => {
    try {
      const response = await api.get(`/products/seller/${sellerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching seller products:', error);
      throw error.response?.data || { error: 'Failed to fetch seller products' };
    }
  },

  createProduct: async (sellerId, productData) => {
    try {
      const response = await api.post(`/products/seller/${sellerId}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error.response?.data || { error: 'Failed to create product' };
    }
  },

  updateProduct: async (productId, sellerId, productData) => {
    try {
      const response = await api.put(`/products/${productId}/seller/${sellerId}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error.response?.data || { error: 'Failed to update product' };
    }
  },

  deleteProduct: async (productId, sellerId) => {
    try {
      const response = await api.delete(`/products/${productId}/seller/${sellerId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error.response?.data || { error: 'Failed to delete product' };
    }
  },

  searchProducts: async (query, params = {}) => {
    try {
      const queryParams = new URLSearchParams({ search: query, ...params });
      const response = await api.get(`/products?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error.response?.data || { error: 'Failed to search products' };
    }
  },
};

// ------------------ Cart Service ------------------
export const cartService = {
  getUserCart: async (userId) => {
    try {
      console.log('Fetching cart for user:', userId);
      const response = await api.get(`/cart/user/${userId}`);
      console.log('Cart API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      throw error.response?.data || { error: 'Failed to fetch cart' };
    }
  },

  addToCart: async (userId, productId, quantity = 1) => {
    try {
      console.log('Adding to cart:', { userId, productId, quantity });
      const response = await api.post(`/cart/user/${userId}/items`, {
        productId: Number(productId),
        quantity: Number(quantity)
      });
      console.log('Add to cart response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      throw error.response?.data || { error: 'Failed to add to cart' };
    }
  },

  updateCartItem: async (userId, productId, quantity) => {
    try {
      console.log('Updating cart item:', { userId, productId, quantity });
      const response = await api.put(`/cart/user/${userId}/items/${productId}?quantity=${quantity}`);
      console.log('Update cart item response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      throw error.response?.data || { error: 'Failed to update cart item' };
    }
  },

  removeFromCart: async (userId, productId) => {
    try {
      console.log('Removing from cart:', { userId, productId });
      const response = await api.delete(`/cart/user/${userId}/items/${productId}`);
      console.log('Remove from cart response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      throw error.response?.data || { error: 'Failed to remove from cart' };
    }
  },

  clearCart: async (userId) => {
    try {
      console.log('Clearing cart for user:', userId);
      const response = await api.delete(`/cart/user/${userId}`);
      console.log('Clear cart response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      throw error.response?.data || { error: 'Failed to clear cart' };
    }
  }
};

// ------------------ Profile Service ------------------
export const profileService = {
  getUserProfile: async (userId) => {
    try {
      console.log('Fetching profile for user:', userId);
      const response = await api.get(`/profile/user/${userId}`);
      console.log('Profile API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      throw error.response?.data || { error: 'Failed to fetch profile' };
    }
  },

  updateProfile: async (userId, profileData) => {
    try {
      console.log('Updating profile for user:', userId, profileData);
      const response = await api.put(`/profile/user/${userId}`, {
        fullName: profileData.fullName,
        phone: profileData.phone || null,
        address: profileData.address || null,
        ecoCommitment: !!profileData.ecoCommitment,
        notificationOrders: !!profileData.notificationOrders,
        notificationPromotions: !!profileData.notificationPromotions,
        notificationSustainability: !!profileData.notificationSustainability
      });
      console.log('Update profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      throw error.response?.data || { error: 'Failed to update profile' };
    }
  },

  updatePassword: async (userId, currentPassword, newPassword) => {
    try {
      console.log('Updating password for user:', userId);
      const response = await api.put(`/profile/user/${userId}/password`, {
        currentPassword,
        newPassword
      });
      console.log('Update password response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating password:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      throw error.response?.data || { error: 'Failed to update password' };
    }
  }
};

// ------------------ Category Service ------------------
export const categoryService = {
  getAllCategories: async () => {
    try {
      // Static list for now – swap with real API when ready
      return [
        'Home & Garden',
        'Electronics',
        'Personal Care',
        'Clothing',
        'Kitchen',
      ];
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch categories' };
    }
  },
};

// ------------------ Utility Functions ------------------
export const apiUtils = {
  // Helper to handle API errors consistently
  handleApiError: (error) => {
    console.error('API Error:', error);
    
    if (!error.response) {
      return { error: 'Network error - please check your connection' };
    }
    
    const status = error.response.status;
    const data = error.response.data;
    
    switch (status) {
      case 401:
        // Unauthorized - token expired or invalid
        tokenService.removeToken();
        tokenService.clearUserData();
        window.location.href = '/login';
        return { error: 'Session expired. Please login again.' };
      
      case 403:
        return { error: 'Access denied. You do not have permission for this action.' };
      
      case 404:
        return { error: 'The requested resource was not found.' };
      
      case 500:
        return { error: 'Server error. Please try again later.' };
      
      default:
        return data || { error: `Request failed with status ${status}` };
    }
  },

  // Helper to ensure user is authenticated
  requireAuth: () => {
    if (!authService.isAuthenticated()) {
      throw new Error('Authentication required');
    }
    return authService.getCurrentUser();
  }
};

// Set up request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Set up response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors globally
    if (error.response?.status === 401) {
      tokenService.removeToken();
      tokenService.clearUserData();
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default authService;
