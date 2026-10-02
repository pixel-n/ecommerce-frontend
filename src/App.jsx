import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './context/AuthContext';
import { useApp } from './context/AppContext';

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useApp();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-gray-900 tracking-tight">
          TECH<span className="text-blue-600">HUB</span>
        </Link> 

        <nav className="flex items-center gap-6">
          <Link to="/" className="text-xs font-bold uppercase text-gray-600 hover:text-blue-600">
            Products
          </Link>
          <Link to="/checkout" className="text-xs font-bold uppercase text-gray-600 hover:text-blue-600 relative">
            Cart
            {cart.length > 0 && (
              <span className="ml-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </Link>

          {user?.role === 'admin' && (
            <Link to="/admin" className="text-xs font-bold uppercase bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg border border-purple-200">
              Admin Panel
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 font-medium">Hi, {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="text-xs font-bold text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white text-xs font-bold uppercase px-4 py-2 rounded-xl hover:bg-blue-700">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-between font-sans">
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
      </div>

      <footer className="bg-white border-t py-6 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} TechHub Store. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 text-[11px] text-gray-600 font-medium">
            <span className="text-gray-400 font-bold">Powered by:</span>
            <span className="bg-gray-100 px-2.5 py-1 rounded-lg border">React Router</span>
            <span className="bg-gray-100 px-2.5 py-1 rounded-lg border">Context API</span>
            <span className="bg-gray-100 px-2.5 py-1 rounded-lg border">Protected Admin Routes</span>
            <span className="bg-gray-100 px-2.5 py-1 rounded-lg border">Role-Based Auth</span>
            <span className="bg-gray-100 px-2.5 py-1 rounded-lg border">Cart Management</span>
            <span className="bg-gray-100 px-2.5 py-1 rounded-lg border">Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}