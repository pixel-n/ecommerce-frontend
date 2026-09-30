import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import API from './api/axios';
import { useCart } from './context/CartContext';

// 1. Products Page Component
function ProductsPage({ products }) {
  const { addToCart } = useCart();

  return (
    <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1e293b' }}>
        Featured Products
      </h2>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>
          No products found. Add products in your backend database.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                }}
              />
              <h3 style={{ margin: '0.5rem 0', color: '#0f172a', fontSize: '1.2rem' }}>
                {product.title}
              </h3>
              <p style={{ margin: '0.25rem 0', fontWeight: 'bold', color: '#2563eb' }}>
                ${product.price}
              </p>
              <p style={{ color: '#64748b', fontSize: '0.9rem', flexGrow: 1 }}>
                {product.description}
              </p>
              <button
                onClick={() => addToCart(product)}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  padding: '0.6rem',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// 2. Shopping Cart Page Component
function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '1.5rem' }}>Your Shopping Cart 🛒</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>Your cart is currently empty.</p>
      ) : (
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e2e8f0',
                padding: '1rem 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <div>
                  <h4 style={{ margin: 0, color: '#0f172a' }}>{item.title}</h4>
                  <p style={{ margin: 0, color: '#2563eb', fontWeight: 'bold' }}>${item.price}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    style={{ padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    style={{ padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #e2e8f0' }}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button
              onClick={() => alert('Order Placed Successfully!')}
              style={{
                backgroundColor: '#16a34a',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// 3. Login Page Component
function LoginPage() {
  return (
    <main style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1e293b' }}>Login</h2>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="email" placeholder="Email" style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="password" placeholder="Password" style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button style={{ padding: '0.6rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
          Sign In
        </button>
      </form>
    </main>
  );
}

// Main App Component
function App() {
  const [products, setProducts] = useState([]);
  const { totalItems } = useCart();

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* Header / Navbar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: '#ffffff' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>MiniStore</h1>
        </Link>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '500' }}>
            Products
          </Link>
          <Link to="/cart" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '500', position: 'relative' }}>
            🛒 Cart
            {totalItems > 0 && (
              <span
                style={{
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '0.75rem',
                  marginLeft: '4px',
                  fontWeight: 'bold',
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/login">
            <button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Login
            </button>
          </Link>
        </nav>
      </header>

      {/* Dynamic Route View */}
      <Routes>
        <Route path="/" element={<ProductsPage products={products} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;