import { createContext, useContext, useState } from 'react';

// ==========================================
// 1. DATA & CONTEXT DEFINITION
// ==========================================
const StoreContext = createContext(null);

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Classic Oxford Cotton Shirt",
    gender: "Men",
    category: "Shirts",
    price: 49.99,
    description: "Tailored fit Oxford shirt made from 100% breathable Egyptian cotton.",
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Sky Blue", "Navy"]
  },
  {
    id: 2,
    title: "Graphic Heavyweight Tee",
    gender: "Men",
    category: "T-Shirts",
    price: 29.99,
    description: "Relaxed fit streetwear graphic t-shirt crafted from heavy 240GSM cotton.",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Charcoal"]
  },
  {
    id: 3,
    title: "Minimalist Silk Evening Dress",
    gender: "Women",
    category: "Dresses",
    price: 129.99,
    description: "Elegant floor-length silk dress with a delicate cowl neckline.",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Emerald Green", "Midnight Black"]
  },
  {
    id: 4,
    title: "Linen Crop Top",
    gender: "Women",
    category: "Tops",
    price: 39.99,
    description: "Lightweight summer linen crop top featuring adjustable back ties.",
    imageUrl: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&q=80&w=800",
    sizes: ["XS", "S", "M"],
    colors: ["Beige", "White"]
  }
];

const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// ==========================================
// 2. NAVBAR COMPONENT
// ==========================================
const Navbar = ({ onOpenCart, onOpenAuth, onNavigate }) => {
  const { user, cart, searchQuery, setSearchQuery, setActiveCategory } = useStore();

  const handleCategoryClick = (gender) => {
    setActiveCategory({ gender, sub: 'All' });
    onNavigate('catalog');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('catalog')}>
            <span className="text-2xl font-black tracking-wider text-gray-900 uppercase">ATELIER</span>
          </div>

          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
            <button onClick={() => handleCategoryClick('Men')} className="hover:text-black">Men</button>
            <button onClick={() => handleCategoryClick('Women')} className="hover:text-black">Women</button>
            <button onClick={() => handleCategoryClick('All')} className="hover:text-black">All Collections</button>
          </nav>

          <div className="flex-1 max-w-xs mx-4">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => onNavigate('catalog')}
              className="w-full px-4 py-1.5 text-sm rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <button 
                onClick={() => onNavigate(user.role === 'admin' ? 'admin' : 'catalog')}
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                {user.role === 'admin' ? 'Admin Dashboard' : `Hi, ${user.name || user.username}`}
              </button>
            ) : (
              <button onClick={onOpenAuth} className="text-sm font-medium text-gray-700 hover:text-black">
                Sign In
              </button>
            )}

            <button onClick={onOpenCart} className="relative p-2 text-gray-700 hover:text-black">
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

// ==========================================
// 3. CATALOG & PRODUCT DETAIL
// ==========================================
const CATEGORY_MAP = {
  Men: ['Shirts', 'T-Shirts', 'Pants', 'Trousers', 'Belts', 'Undergarments'],
  Women: ['Dresses', 'Tops', 'Clothes', 'Pants', 'T-Shirts', 'Trousers']
};

const CatalogPage = ({ products, onSelectProduct }) => {
  const { activeCategory, setActiveCategory, searchQuery, addToCart } = useStore();

  const filteredProducts = products.filter(item => {
    const matchesGender = activeCategory.gender === 'All' || item.gender === activeCategory.gender;
    const matchesSub = activeCategory.sub === 'All' || item.category === activeCategory.sub;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGender && matchesSub && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Categories</h3>
          <button
            onClick={() => setActiveCategory({ gender: 'All', sub: 'All' })}
            className={`block w-full text-left py-2 px-3 rounded text-sm font-medium mb-2 ${
              activeCategory.gender === 'All' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>

          {['Men', 'Women'].map(gender => (
            <div key={gender} className="mb-6">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-2">{gender}</h4>
              <div className="space-y-1">
                {CATEGORY_MAP[gender].map(sub => (
                  <button
                    key={sub}
                    onClick={() => setActiveCategory({ gender, sub })}
                    className={`block w-full text-left py-1.5 px-3 rounded text-sm ${
                      activeCategory.gender === gender && activeCategory.sub === sub
                        ? 'bg-gray-200 font-semibold text-black'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {activeCategory.gender} {activeCategory.sub !== 'All' ? `- ${activeCategory.sub}` : ''}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="group border border-gray-100 rounded-lg overflow-hidden bg-white flex flex-col justify-between">
              <div className="cursor-pointer overflow-hidden" onClick={() => onSelectProduct(product)}>
                <img src={product.imageUrl} alt={product.title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-400 uppercase">{product.gender} • {product.category}</p>
                  <h3 className="font-medium text-gray-900 mt-1 cursor-pointer hover:underline" onClick={() => onSelectProduct(product)}>
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-2 border-t">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0] || 'Black', 1);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-black rounded hover:bg-gray-800"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const ProductDetailPage = ({ product, onBack }) => {
  const { addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Black');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <button onClick={onBack} className="mb-6 text-sm font-medium text-gray-600 hover:text-black">← Back to Catalog</button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img src={product.imageUrl} alt={product.title} className="w-full h-[500px] object-cover" />
        </div>
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase">{product.gender} / {product.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
          <p className="text-2xl font-black mt-4">${product.price.toFixed(2)}</p>
          <p className="mt-6 text-gray-600 text-sm">{product.description}</p>

          {product.sizes && (
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">Select Size</label>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`w-10 h-10 border rounded text-sm ${selectedSize === size ? 'bg-black text-white' : ''}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">Select Color</label>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)} className={`px-3 py-1 border rounded text-sm ${selectedColor === color ? 'bg-black text-white' : ''}`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border rounded">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1.5 text-sm font-bold">-</button>
              <span className="px-3 text-sm font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1.5 text-sm font-bold">+</button>
            </div>
            <button
              onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
              className="flex-1 bg-black text-white py-3.5 px-6 rounded font-semibold text-sm hover:bg-gray-800"
            >
              Add to Shopping Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. CART DRAWER & CHECKOUT
// ==========================================
const CartDrawer = ({ isOpen, onClose, onNavigateCheckout }) => {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-lg font-bold">Shopping Bag ({cart.length})</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black">✕</button>
          </div>

          <div className="divide-y my-4">
            {cart.map((item, idx) => (
              <div key={idx} className="py-4 flex gap-4">
                <img src={item.imageUrl} alt="" className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-500">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                  <p className="text-sm font-bold mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(idx, -1)} className="px-2 py-0.5 border text-xs">-</button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(idx, 1)} className="px-2 py-0.5 border text-xs">+</button>
                    <button onClick={() => removeFromCart(idx)} className="text-xs text-red-500 ml-auto">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => { onClose(); onNavigateCheckout(); }}
            disabled={cart.length === 0}
            className="w-full bg-black text-white py-3 rounded font-bold text-sm hover:bg-gray-800 disabled:bg-gray-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ onSuccess }) => {
  const { cartTotal, user, clearCart } = useStore();
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    onSuccess();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <h2 className="font-semibold text-lg">Shipping Information</h2>
        <input required placeholder="Full Name" defaultValue={user?.name || ''} className="w-full p-2 border rounded text-sm" />
        <input required placeholder="Email" defaultValue={user?.email || ''} className="w-full p-2 border rounded text-sm" />
        <textarea required placeholder="Shipping Address" defaultValue={user?.address || ''} className="w-full p-2 border rounded text-sm" />

        <h2 className="font-semibold text-lg pt-4 border-t">Payment Method</h2>
        {['COD', 'MFS (bKash/Nagad)', 'Bank Transfer'].map(m => (
          <label key={m} className="block border p-3 rounded bg-white text-sm font-medium cursor-pointer">
            <input type="radio" name="payment" checked={paymentMethod === m} onChange={() => setPaymentMethod(m)} className="mr-2" />
            {m}
          </label>
        ))}

        <div className="pt-4 border-t flex justify-between font-bold text-lg">
          <span>Total Payable:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <button type="submit" className="w-full bg-black text-white py-3 rounded font-bold text-sm hover:bg-gray-800">
          Place Order
        </button>
      </form>
    </div>
  );
};

// ==========================================
// 5. AUTH & ADMIN DASHBOARD
// ==========================================
const AuthModal = ({ isOpen, onClose }) => {
  const { setUser } = useStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({
      username,
      name: isAdmin ? "Store Administrator" : "Jane Doe",
      email: "user@example.com",
      role: isAdmin ? "admin" : "customer"
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-sm w-full p-6 rounded-lg space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-bold">{isAdmin ? "Admin Login" : "Customer Sign In"}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleLogin} className="space-y-3">
          <input required placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2 border rounded text-sm" />
          <input required type="password" placeholder="Password" className="w-full p-2 border rounded text-sm" />
          <button type="submit" className="w-full bg-black text-white py-2 rounded font-bold text-sm">
            Login
          </button>
        </form>
        <button onClick={() => setIsAdmin(!isAdmin)} className="text-xs text-gray-500 underline block text-center">
          Switch to {isAdmin ? "Customer" : "Admin"} Sign In
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = ({ products, setProducts }) => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-9021",
      customer: {
        name: "Jane Doe",
        username: "janedoe",
        email: "jane@example.com",
        phone: "+123-456-7890",
        address: "123 Fashion Ave, Suite 100, New York, NY"
      },
      items: [
        { title: "Minimalist Silk Evening Dress", size: "M", color: "Emerald Green", quantity: 1, price: 129.99 }
      ],
      paymentMethod: "MFS (bKash)",
      totalAmount: 129.99,
      status: "Pending"
    }
  ]);

  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    gender: 'Men',
    category: 'Shirts',
    price: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800'
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price) || 0,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White"]
    };
    setProducts([...products, productToAdd]);
    setIsAddProductOpen(false);
    setNewProduct({
      title: '', gender: 'Men', category: 'Shirts', price: '', description: '',
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800'
    });
  };

  const handleRemoveProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel - Store Orders</h1>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                <th className="px-4 py-3 text-left font-semibold">Customer</th>
                <th className="px-4 py-3 text-left font-semibold">Payment</th>
                <th className="px-4 py-3 text-left font-semibold">Total</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-bold text-xs">{order.id}</td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => setSelectedOrderDetails(order)}
                      className="text-black font-semibold underline hover:text-gray-600"
                    >
                      {order.customer.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.paymentMethod}</td>
                  <td className="px-4 py-3 font-bold">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border rounded px-2 py-1 text-xs font-bold bg-gray-50"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => setSelectedOrderDetails(order)}
                      className="text-xs bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-t pt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Manage Store Inventory ({products.length} Products)</h2>
          <button 
            onClick={() => setIsAddProductOpen(true)}
            className="bg-black text-white text-xs font-bold px-4 py-2 rounded hover:bg-gray-800"
          >
            + Add New Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="border rounded p-3 flex items-center justify-between gap-3 bg-white">
              <img src={product.imageUrl} alt="" className="w-12 h-12 object-cover rounded" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs truncate">{product.title}</h4>
                <p className="text-xs text-gray-500">${product.price.toFixed(2)} • {product.gender}</p>
              </div>
              <button 
                onClick={() => handleRemoveProduct(product.id)}
                className="text-xs text-red-600 hover:underline font-semibold"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 rounded-lg space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg">Order Details ({selectedOrderDetails.id})</h3>
              <button onClick={() => setSelectedOrderDetails(null)} className="text-gray-400 hover:text-black">✕</button>
            </div>

            <div className="space-y-1 text-xs text-gray-700 bg-gray-50 p-4 rounded">
              <h4 className="font-bold text-gray-900 mb-2 uppercase text-[10px] tracking-wider">Customer Information</h4>
              <p><strong>Username:</strong> {selectedOrderDetails.customer.username}</p>
              <p><strong>Full Name:</strong> {selectedOrderDetails.customer.name}</p>
              <p><strong>Email:</strong> {selectedOrderDetails.customer.email}</p>
              <p><strong>Phone:</strong> {selectedOrderDetails.customer.phone}</p>
              <p><strong>Address:</strong> {selectedOrderDetails.customer.address}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Ordered Items</h4>
              <div className="divide-y border-t border-b">
                {selectedOrderDetails.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex justify-between text-xs">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-gray-500">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setSelectedOrderDetails(null)}
              className="w-full bg-black text-white py-2 rounded text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-lg space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold">Add New Product</h3>
              <button onClick={() => setIsAddProductOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Title</label>
                <input 
                  required 
                  value={newProduct.title} 
                  onChange={e => setNewProduct({...newProduct, title: e.target.value})} 
                  className="w-full border rounded p-2" 
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Gender</label>
                  <select 
                    value={newProduct.gender} 
                    onChange={e => setNewProduct({...newProduct, gender: e.target.value})} 
                    className="w-full border rounded p-2"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <input 
                    required 
                    value={newProduct.category} 
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})} 
                    className="w-full border rounded p-2" 
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Price ($)</label>
                <input 
                  required 
                  type="number" 
                  step="0.01" 
                  value={newProduct.price} 
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})} 
                  className="w-full border rounded p-2" 
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea 
                  required 
                  rows={2}
                  value={newProduct.description} 
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})} 
                  className="w-full border rounded p-2" 
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input 
                  required 
                  value={newProduct.imageUrl} 
                  onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} 
                  className="w-full border rounded p-2" 
                />
              </div>

              <button type="submit" className="w-full bg-black text-white py-2.5 rounded font-bold mt-2">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 6. MAIN CONTENT WRAPPER
// ==========================================
function MainContent() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [currentView, setCurrentView] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between">
      <Navbar 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenAuth={() => setIsAuthOpen(true)}
        onNavigate={(view) => setCurrentView(view)}
      />

      <div className="flex-1">
        {currentView === 'catalog' && (
          <CatalogPage products={products} onSelectProduct={handleSelectProduct} />
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetailPage product={selectedProduct} onBack={() => setCurrentView('catalog')} />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage onSuccess={() => setCurrentView('success')} />
        )}

        {currentView === 'admin' && (
          <AdminDashboard products={products} setProducts={setProducts} />
        )}

        {currentView === 'success' && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-green-600">Order Placed Successfully!</h2>
            <p className="text-gray-500 mt-2">Thank you for shopping with ATELIER.</p>
            <button onClick={() => setCurrentView('catalog')} className="mt-6 bg-black text-white px-6 py-2 rounded text-sm font-semibold">
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onNavigateCheckout={() => setCurrentView('checkout')}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />

      <footer className="border-t py-6 text-center text-xs text-gray-400">
        © 2026 ATELIER Fashion House. Production UI Layer Ready.
      </footer>
    </div>
  );
}

// ==========================================
// 7. MAIN APP ROOT (Provider Wrapper)
// ==========================================
export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState({ gender: 'All', sub: 'All' });

  const addToCart = (product, size, color, quantity = 1) => {
    const newItem = { ...product, selectedSize: size, selectedColor: color, quantity };
    const updatedCart = [...cart, newItem];
    setCart(updatedCart);

    const fallbackTotal = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartTotal(fallbackTotal);
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
    setCartTotal(updated.reduce((acc, item) => acc + item.price * item.quantity, 0));
  };

  const removeFromCart = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    setCartTotal(updated.reduce((acc, item) => acc + item.price * item.quantity, 0));
  };

  const clearCart = () => {
    setCart([]);
    setCartTotal(0);
  };

  return (
    <StoreContext.Provider value={{
      user, setUser, cart, cartTotal, addToCart, updateQuantity, removeFromCart, clearCart,
      searchQuery, setSearchQuery, activeCategory, setActiveCategory
    }}>
      <MainContent />
    </StoreContext.Provider>
  );
}