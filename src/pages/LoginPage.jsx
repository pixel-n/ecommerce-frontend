import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Direct call to MongoDB / Express API
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const userData = response.data;
      login(userData); // Save response from database to Context API

      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Connection error.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900">Sign In to TechHub</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Authenticate via Backend API</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border p-3.5 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              placeholder="admin@techhub.pk"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border p-3.5 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}