import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cart, clearCart } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Your cart is empty!');

    const newOrder = {
      _id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      user: { name: formData.fullName, email: formData.email },
      items: cart,
      totalPrice: totalAmount,
      status: 'Processing',
      createdAt: new Date().toLocaleDateString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
    localStorage.setItem('admin_orders', JSON.stringify([newOrder, ...existingOrders]));

    clearCart();
    alert('Shukriya! Order placed successfully.');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Checkout & Shipping Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            placeholder="Muhammad Ali"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full bg-gray-700 text-white p-3 rounded-xl text-sm focus:outline-none placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            placeholder="ali@example.pk"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-gray-700 text-white p-3 rounded-xl text-sm focus:outline-none placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Shipping Address</label>
          <input
            type="text"
            required
            placeholder="House #12, Main Boulevard, Gulberg III"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full bg-gray-700 text-white p-3 rounded-xl text-sm focus:outline-none placeholder-gray-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
            <input
              type="text"
              required
              placeholder="Lahore"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-gray-700 text-white p-3 rounded-xl text-sm focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">ZIP Code</label>
            <input
              type="text"
              required
              placeholder="54000"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="w-full bg-gray-700 text-white p-3 rounded-xl text-sm focus:outline-none placeholder-gray-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition mt-4"
        >
          PAY RS. {totalAmount.toLocaleString()} & COMPLETE ORDER
        </button>
      </form>
    </div>
  );
}