import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ShopProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem('app_theme') || 'dark');

  // User Auth State
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || null
  );

  // Catalog state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters State
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('newest');

  // Cart State
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync Theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  // Save User Info to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [user]);

  // Fetch products with filters
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        keyword: searchKeyword,
        category: selectedCategory,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sortBy: sortBy,
      }).toString();

      const res = await fetch(`${API_BASE}/products?${query}`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products || []);
      } else {
        setError(data.message || 'Failed to load products');
      }
    } catch (err) {
      console.error(err);
      setError('Server connection error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchKeyword, selectedCategory, priceRange, sortBy]);

  // Auth Functions
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        showToast(`Welcome back, ${data.name}!`, 'success');
        return { success: true };
      } else {
        showToast(data.message || 'Login failed', 'danger');
        return { success: false, message: data.message };
      }
    } catch (err) {
      showToast('Network error during login', 'danger');
      return { success: false, message: err.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        showToast(`Account created! Welcome ${data.name}`, 'success');
        return { success: true };
      } else {
        showToast(data.message || 'Registration failed', 'danger');
        return { success: false, message: data.message };
      }
    } catch (err) {
      showToast('Network error during registration', 'danger');
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  // Cart Functions
  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existIndex = prevCart.findIndex((item) => String(item._id) === String(product._id));
      if (existIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existIndex].qty + qty;
        updated[existIndex].qty = Math.min(newQty, product.countInStock || 99);
        return updated;
      } else {
        return [...prevCart, { ...product, qty }];
      }
    });
    showToast(`Added "${product.name}" to cart`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => String(item._id) !== String(id)));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        String(item._id) === String(id) ? { ...item, qty: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const shippingPrice = cartSubtotal > 100 || cartSubtotal === 0 ? 0 : 15;
  const taxPrice = Number((cartSubtotal * 0.08).toFixed(2));
  const cartTotal = Number((cartSubtotal + shippingPrice + taxPrice).toFixed(2));

  return (
    <ShopContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        login,
        register,
        logout,
        products,
        loading,
        error,
        fetchProducts,
        searchKeyword,
        setSearchKeyword,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        cartItemCount,
        shippingPrice,
        taxPrice,
        cartTotal,
        toast,
        showToast,
        API_BASE,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
