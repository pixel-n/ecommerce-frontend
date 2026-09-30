import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

// --- Navigation Bar Component ---
export const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-400">
          MiniStore
        </Link>
        <div className="flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-blue-400 transition">
            Products
          </Link>
          <Link to="/cart" className="relative hover:text-blue-400 transition">
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- Page 1: Product List Page ---
export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-10 font-medium">Loading products from MongoDB...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Featured Products</h1>
      {products.length === 0 ? (
        <p className="text-slate-500">No products found. Add products in your backend database.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="bg-slate-100 h-40 rounded-lg mb-4 flex items-center justify-center text-slate-400 text-3xl">
                  📦
                </div>
                <h3 className="font-semibold text-lg text-slate-800">{p.title}</h3>
                <p className="text-slate-500 text-sm mt-1 line-clamp-2">{p.description || 'Quality product available in store.'}</p>
                <p className="text-xl font-bold text-emerald-600 mt-3">${p.price}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  to={`/product/${p._id}`}
                  className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium text-sm transition"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(p)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Page 2: Product Detail Page ---
export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="text-center p-10">Loading details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate('/')} className="text-blue-600 hover:underline mb-6 font-medium">
        ← Back to Products
      </button>
      <div className="bg-white border rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
        <div className="bg-slate-100 h-64 rounded-xl flex items-center justify-center text-5xl text-slate-400">
          🛍️
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{product.title}</h1>
            <p className="text-2xl font-bold text-emerald-600 mt-2">${product.price}</p>
            <p className="text-slate-600 mt-4 leading-relaxed">
              {product.description || 'Detailed item description from MongoDB Atlas repository.'}
            </p>
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-4 mb-4">
              <label className="font-semibold text-slate-700">Quantity:</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 border rounded-lg p-2 text-center"
              />
            </div>
            <button
              onClick={() => {
                addToCart(product, qty);
                navigate('/cart');
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Add to Cart (${product.price * qty})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Page 3: Cart Page ---
export const CartPage = () => {
  const { cart, removeFromCart, totalAmount } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center">
          <p className="text-slate-500 mb-4">Your cart is currently empty.</p>
          <Link to="/" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item._id} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-slate-800">{item.title}</h3>
                  <p className="text-sm text-slate-500">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-800">${item.price * item.quantity}</span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4 flex justify-between items-center">
            <div>
              <span className="text-slate-500">Total:</span>
              <p className="text-2xl font-bold text-emerald-600">${totalAmount}</p>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Page 4: Checkout Page ---
export const CheckoutPage = () => {
  const { cart, totalAmount, clearCart } = useContext(CartContext);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', city: '', zip: '' });
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 border rounded-2xl text-center shadow-sm">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-slate-800">Order Confirmed!</h2>
        <p className="text-slate-600 mt-2">Thank you for your purchase. Your order is being processed.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Checkout Flow</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleCheckout} className="bg-white border p-6 rounded-xl space-y-4 shadow-sm">
          <h2 className="font-semibold text-slate-800 text-lg border-b pb-2">Shipping Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2.5 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Shipping Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full p-2.5 border rounded-lg"
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full p-2.5 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
              className="w-full p-2.5 border rounded-lg"
              required
            />
          </div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition mt-4">
            Place Order (${totalAmount})
          </button>
        </form>

        <div className="bg-slate-50 border p-6 rounded-xl h-fit">
          <h2 className="font-semibold text-slate-800 text-lg border-b pb-2 mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between text-sm py-1.5">
              <span>{item.title} (x{item.quantity})</span>
              <span className="font-medium">${item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-3 flex justify-between font-bold text-slate-800">
            <span>Total</span>
            <span className="text-emerald-600">${totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};