import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, role: 'customer'|'admin', token }
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState({ gender: 'All', sub: 'All' });

  // Add item to cart & trigger backend total calculation
  const addToCart = async (product, size, color, quantity = 1) => {
    const newItem = { ...product, selectedSize: size, selectedColor: color, quantity };
    const updatedCart = [...cart, newItem];
    setCart(updatedCart);

    // API INTEGRATION POINT: Send items to backend for price/tax calculation
    try {
      // const res = await axios.post('/api/cart/calculate', { items: updatedCart });
      // setCartTotal(res.data.total);
      
      // Front-End fallback display calculation
      const fallbackTotal = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setCartTotal(fallbackTotal);
    } catch (err) {
      console.error("Cart total calculation failed", err);
    }
  };

  const updateQuantity = (index, delta) => {
    const updated = cart.map((item, i) => {
      if (i === index) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);
    
    setCart(updated);
    // API INTEGRATION POINT: Recalculate total with backend
    setCartTotal(updated.reduce((acc, item) => acc + item.price * item.quantity, 0));
  };

  return (
    <StoreContext.Provider value={{
      user, setUser, cart, cartTotal, addToCart, updateQuantity,
      searchQuery, setSearchQuery, activeCategory, setActiveCategory
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);