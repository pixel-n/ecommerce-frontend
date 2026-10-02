import React, { useState, useEffect } from 'react';

const INITIAL_ORDERS = [
  {
    _id: 'ORD-849201',
    user: { name: 'Muhammad Usman', email: 'usman@techhub.pk' },
    items: [{ title: 'Sony WH-1000XM5 Wireless Headphones', price: 110000 }],
    totalPrice: 110000,
    status: 'Processing',
    createdAt: '10/01/2026'
  },
  {
    _id: 'ORD-302194',
    user: { name: 'Ayesha Khan', email: 'ayesha@domain.pk' },
    items: [{ title: 'Apple Watch Series 9 GPS 45mm', price: 125000 }],
    totalPrice: 125000,
    status: 'Shipped',
    createdAt: '09/30/2026'
  },
  {
    _id: 'ORD-119283',
    user: { name: 'Hamza Ahmed', email: 'Hamza@dev.pk' },
    items: [{ title: 'Keychron K2 Wireless Mechanical Keyboard', price: 28000 }],
    totalPrice: 28000,
    status: 'Delivered',
    createdAt: '09/28/2026'
  }
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
    setOrders(savedOrders.length > 0 ? savedOrders : INITIAL_ORDERS);
  }, []);

  const handleStatusUpdate = (orderId, newStatus) => {
    const updated = orders.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('admin_orders', JSON.stringify(updated));
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingCount = orders.filter((o) => o.status === 'Processing').length;
  const completedCount = orders.filter((o) => o.status === 'Delivered').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Overview</span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Operations Center</h1>
        </div>
        <div className="bg-gray-900 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          System Online
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold uppercase text-gray-400">Total Revenue</p>
          <p className="text-3xl font-black text-gray-900 mt-2">Rs. {totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold uppercase text-gray-400">Total Orders</p>
          <p className="text-3xl font-black text-emerald-600 mt-2">{orders.length}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold uppercase text-gray-400">Order Stats</p>
          <div className="flex gap-4 mt-2 font-bold text-sm">
            <span className="text-amber-600">{pendingCount} Processing</span>
            <span className="text-emerald-600">{completedCount} Delivered</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-sm text-gray-800">Recent Customer Orders</h2>
          <span className="text-xs text-gray-400 font-medium">Real-time status updates</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100/70 border-b border-gray-200 text-gray-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Items Purchased</th>
                <th className="py-3 px-6">Total Amount</th>
                <th className="py-3 px-6">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {orders.map((o) => (
                <tr key={o._id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 font-mono font-bold text-emerald-600 text-xs">{o._id}</td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">{o.user.name}</div>
                    <div className="text-xs text-gray-400">{o.user.email}</div>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-600 max-w-xs truncate">
                    {o.items?.map((i) => i.title).join(', ') || 'Electronics Package'}
                  </td>
                  <td className="py-4 px-6 font-black text-gray-900">Rs. {o.totalPrice.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusUpdate(o._id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer focus:outline-none ${
                        o.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : o.status === 'Shipped'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}