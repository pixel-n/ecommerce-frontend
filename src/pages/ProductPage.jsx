import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const PRODUCTS = [
  {
    id: '1',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Audio',
    price: 398.00,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'Industry-leading noise canceling with two processors and 8 microphones.'
  },
  {
    id: '2',
    title: 'Apple Watch Series 9 GPS 45mm',
    category: 'Wearables',
    price: 429.00,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    description: 'Powerful health sensors, advanced workout metrics, and double tap gesture.'
  },
  {
    id: '3',
    title: 'Keychron K2 Wireless Mechanical Keyboard',
    category: 'Accessories',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    description: '75% layout tactile Bluetooth mechanical keyboard with RGB backlighting.'
  },
  {
    id: '4',
    title: 'LG UltraGear 27" QHD Gaming Monitor',
    category: 'Displays',
    price: 346.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    description: '165Hz refresh rate, 1ms response time, NVIDIA G-SYNC compatible.'
  },
  {
    id: '5',
    title: 'Logitech MX Master 3S Wireless Mouse',
    category: 'Accessories',
    price: 99.00,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    description: '8K DPI track-anywhere sensor with quiet clicks and ergonomic thumb rest.'
  },
  {
    id: '6',
    title: 'JBL Charge 5 Portable Speaker',
    category: 'Audio',
    price: 179.95,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    description: 'IP67 waterproof and dustproof speaker with built-in power bank.'
  },
  {
    id: '7',
    title: 'GoPro HERO12 Black Action Camera',
    category: 'Cameras',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
    description: '5.3K60 video, HDR imaging, and HyperSmooth 6.0 stabilization.'
  },
  {
    id: '8',
    title: 'Anker 737 Power Bank 24,000mAh',
    category: 'Power',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1609592424074-122e23631628?w=500&q=80',
    description: '140W multi-device fast charging with smart digital display.'
  },
  {
    id: '9',
    title: 'Bose QuietComfort Earbuds II',
    category: 'Audio',
    price: 279.00,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    description: 'Customized noise cancellation and sound in a compact wireless design.'
  },
  {
    id: '10',
    title: 'Elgato Stream Deck MK.2',
    category: 'Accessories',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=500&q=80',
    description: '15 customizable LCD keys to control apps, tools, and platforms.'
  },
  {
    id: '11',
    title: 'Samsung T7 Shield 2TB Portable SSD',
    category: 'Storage',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80',
    description: 'Rugged USB 3.2 Gen 2 external SSD with speeds up to 1050 MB/s.'
  },
  {
    id: '12',
    title: 'DJI Mini 4 Pro Drone (Fly More Combo)',
    category: 'Cameras',
    price: 759.00,
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&q=80',
    description: 'Under 249g lightweight drone with 4K/60fps HDR video and obstacle sensing.'
  }
];

export default function ProductPage() {
  const { addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Audio', 'Wearables', 'Accessories', 'Displays', 'Cameras', 'Power', 'Storage'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Header */}
      <div className="bg-gray-900 text-white rounded-3xl p-8 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Official Store</span>
          <h1 className="text-3xl sm:text-5xl font-black mt-1 tracking-tight">TECHHUB GEAR</h1>
          <p className="text-gray-400 mt-2 text-sm max-w-md">Discover premium devices, audio systems, and flagship hardware.</p>
        </div>
        <div className="bg-gray-800/80 border border-gray-700 p-4 rounded-2xl text-center min-w-[200px]">
          <span className="text-2xl font-bold text-blue-400">{PRODUCTS.length}+</span>
          <p className="text-xs text-gray-300">In-Stock Products</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <div className="h-48 bg-gray-50 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                  {product.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{product.title}</h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{product.description}</p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-black text-gray-900">${product.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}