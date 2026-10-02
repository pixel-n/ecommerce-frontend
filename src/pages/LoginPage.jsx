import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    // Role verification logic
    const isAdmin = email.toLowerCase().includes('admin');
    const userRole = isAdmin ? 'admin' : 'customer';

    const userProfile = {
      name: isAdmin ? 'Admin User' : email.split('@')[0],
      email: email,
      role: userRole,
    };

    login(userProfile);

    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900">Welcome Back</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Sign in to manage your orders & account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@techhub.pk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3.5 rounded-xl text-sm focus:outline-none focus:border-blue-600 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3.5 rounded-xl text-sm focus:outline-none focus:border-blue-600 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition mt-2 shadow-sm"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}