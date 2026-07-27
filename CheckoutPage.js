import React, { useState } from 'react';
import { useStore } from './StoreContext';

export const CheckoutPage = ({ onSuccess }) => {
  const { cart, cartTotal, user } = useStore();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    username: user?.username || '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // API INTEGRATION POINT: Send order creation request to backend
    const orderPayload = {
      customerDetails: formData,
      cartItems: cart,
      paymentMethod,
      totalAmount: cartTotal
    };

    try {
      // const res = await axios.post('/api/orders/create', orderPayload);
      console.log("Submitting order to backend API:", orderPayload);
      setTimeout(() => {
        setIsSubmitting(false);
        onSuccess();
      }, 1000);
    } catch (err) {
      console.error("Order creation failed", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Customer & Shipping Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">1. Shipping & Account Info</h2>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Full Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-black" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-black" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Phone Number</label>
            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-black" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Shipping Address</label>
            <textarea required rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-black" />
          </div>

          <div className="pt-2 border-t">
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Username</label>
            <input required type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full border rounded px-3 py-2 text-sm bg-gray-50" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Password (to confirm order)</label>
            <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-black" />
          </div>
        </div>

        {/* Order Summary & Payment Selection */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">2. Payment Method</h2>
            
            <div className="space-y-3">
              {[
                { id: 'COD', name: 'Cash on Delivery' },
                { id: 'MFS', name: 'Mobile Financial Services (bKash/Nagad)' },
                { id: 'BANK', name: 'Bank Transfer' }
              ].map(method => (
                <label key={method.id} className="flex items-center space-x-3 p-3 border rounded cursor-pointer bg-white">
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-black focus:ring-black"
                  />
                  <span className="text-sm font-medium text-gray-800">{method.name}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">* Calculated server-side at checkout confirmation.</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? 'Processing Order...' : 'Confirm Order'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};