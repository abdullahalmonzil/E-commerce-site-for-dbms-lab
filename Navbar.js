import React from 'react';
import { useStore } from './StoreContext';

export const Navbar = ({ onOpenCart, onOpenAuth, onNavigate }) => {
  const { user, cart, searchQuery, setSearchQuery, setActiveCategory } = useStore();

  const handleCategoryClick = (gender, sub = 'All') => {
    setActiveCategory({ gender, sub });
    onNavigate('catalog');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-2xl font-black tracking-wider text-gray-900 uppercase">ATELIER</span>
          </div>

          {/* Nav Categories */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
            <button 
              onClick={() => handleCategoryClick('Men')} 
              className="hover:text-black transition-colors"
            >
              Men
            </button>
            <button 
              onClick={() => handleCategoryClick('Women')} 
              className="hover:text-black transition-colors"
            >
              Women
            </button>
            <button 
              onClick={() => handleCategoryClick('All')} 
              className="hover:text-black transition-colors"
            >
              All Collections
            </button>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => onNavigate('catalog')}
                className="w-full pl-9 pr-4 py-1.5 text-sm rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          {/* Account & Cart Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <button 
                onClick={() => onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'profile')}
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                {user.role === 'admin' ? 'Admin Panel' : `Hi, ${user.username}`}
              </button>
            ) : (
              <button 
                onClick={onOpenAuth} 
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                Sign In
              </button>
            )}

            {/* Shopping Cart Drawer Trigger */}
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-gray-700 hover:text-black transition-colors"
              aria-label="View Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-black rounded-full">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};