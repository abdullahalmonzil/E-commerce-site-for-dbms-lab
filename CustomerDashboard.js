import React, { useState } from 'react';
import { useStore } from './StoreContext';

export const CustomerDashboard = () => {
  const { user, setUser } = useStore();
  const [formData, setFormData] = useState({
    name: user?.name || 'Jane Doe',
    email: user?.email || 'jane@example.com',
    phone: user?.phone || '+1234567890',
    address: user?.address || '123 Fashion Ave, Suite 100',
    username: user?.username || 'janedoe_fashion', // Read-only
    password: ''
  });
  const [statusMsg, setStatusMsg] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    // API INTEGRATION POINT: Update Profile API call
    try {
      // await axios.put('/api/customer/profile', formData);
      setUser({ ...user, ...formData });
      setStatusMsg('Profile updated successfully!');
    } catch (err) {
      setStatusMsg('Failed to update profile.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Customer Profile Dashboard</h1>
      
      {statusMsg && (
        <div className="mb-4 p-3 bg-gray-100 text-sm font-medium text-gray-800 rounded">
          {statusMsg}
        </div>
      )}

      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Username (Immutable)</label>
          <input
            type="text"
            disabled
            value={formData.username}
            className="w-full border rounded px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Shipping Address</label>
          <textarea
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            placeholder="Leave blank to keep unchanged"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-gray-800 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};