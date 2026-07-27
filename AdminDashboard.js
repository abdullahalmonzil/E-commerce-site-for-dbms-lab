import React, { useState } from 'react';

export const AdminDashboard = ({ mockOrders }) => {
  const [orders, setOrders] = useState(mockOrders || []);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    // API INTEGRATION POINT: Send order status update to backend
    // await axios.patch(`/api/admin/orders/${orderId}`, { status: newStatus });
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Panel - Store Orders</h1>

      {/* Orders Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Order ID</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Customer</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Payment</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Total</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 font-mono text-xs">{order.id}</td>
                <td className="px-4 py-3">
                  <button 
                    onClick={() => setSelectedCustomer(order.customer)}
                    className="text-black font-medium underline hover:text-gray-600"
                  >
                    {order.customer.name}
                  </button>
                </td>
                <td className="px-4 py-3 text-gray-600">{order.paymentMethod}</td>
                <td className="px-4 py-3 font-semibold">${order.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded px-2 py-1 text-xs font-semibold bg-gray-50"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button 
                    onClick={() => setSelectedCustomer(order.customer)}
                    className="text-xs bg-gray-100 px-2.5 py-1 rounded hover:bg-gray-200"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Information Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg">Customer Profile</h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-black">✕</button>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Username:</strong> {selectedCustomer.username}</p>
              <p><strong>Name:</strong> {selectedCustomer.name}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              <p><strong>Address:</strong> {selectedCustomer.address}</p>
            </div>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="w-full bg-black text-white py-2 rounded text-sm font-semibold mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};