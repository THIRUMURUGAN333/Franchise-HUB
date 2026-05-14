import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFranchises } from '../services/api';
import FranchiseCard from '../components/FranchiseCard';

const categories = [
  { name: 'Restaurant', icon: '🍽️', query: 'Food' },
  { name: 'Shopping', icon: '🛍️', query: 'Retail' },
  { name: 'Education', icon: '🎓', query: 'Education' },
  { name: 'Fitness', icon: '💪', query: 'Services' },
  { name: 'Beauty & Spa', icon: '💆', query: 'Services' },
  { name: 'Automotive', icon: '🚗', query: 'Services' },
];

export default function Home() {
  const [franchises, setFranchises] = useState([]);
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFranchises().then(r => setFranchises(r.data.slice(0, 3))).catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (what) params.set('search', what);
    if (where) params.set('city', where);
    navigate(`/franchises?${params.toString()}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section
        className="relative min-h-[520px] flex flex-col items-center justify-center text-center px-4"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 70%, #6366f1 100%)',
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <span className="bg-white/20 text-white text-xs font-semibold px-4 py-1 rounded-full mb-4 inline-block">
            🚀 India's #1 Franchise Network
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-3 mb-3 leading-tight">
            Best Franchise Network
          </h1>
          <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">
            Growing business community. Grow & Expand your Business with Franchising.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-2xl mx-auto">
            <div className="flex items-center flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-100">
              <span className="text-indigo-500 font-bold text-sm mr-3 whitespace-nowrap">What</span>
              <input
                type="text"
                placeholder="Ex: shopping, restaurant..."
                value={what}
                onChange={e => setWhat(e.target.value)}
                className="flex-1 outline-none text-gray-700 text-sm placeholder-gray-400"
              />
            </div>
            <div className="flex items-center flex-1 px-5 py-4">
              <span className="text-indigo-500 font-bold text-sm mr-3 whitespace-nowrap">Where</span>
              <input
                type="text"
                placeholder="Your City"
                value={where}
                onChange={e => setWhere(e.target.value)}
                className="flex-1 outline-none text-gray-700 text-sm placeholder-gray-400"
              />
              <button type="submit"
                className="ml-3 bg-indigo-600 hover:bg-indigo-700 text-white w-10 h-10 rounded-xl flex items-center justify-center transition flex-shrink-0">
                🔍
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={`/franchises?category=${cat.query}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-indigo-50 transition group"
              >
                <div className="w-14 h-14 bg-indigo-50 group-hover:bg-indigo-100 rounded-full flex items-center justify-center text-2xl transition">
                  {cat.icon}
                </div>
                <span className="text-xs font-semibold text-gray-600 text-center">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '500+', label: 'Franchise Brands', icon: '🏪' },
            { value: '50+', label: 'Categories', icon: '📂' },
            { value: '10K+', label: 'Investors', icon: '👥' },
            { value: '₹3L+', label: 'Min Investment', icon: '💰' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-black text-indigo-600">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Franchises */}
      {franchises.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-12 pb-16">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-800">Featured Franchises</h2>
              <p className="text-gray-500 text-sm mt-1">Top picks for smart investors</p>
            </div>
            <Link to="/franchises"
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {franchises.map(f => <FranchiseCard key={f._id} franchise={f} />)}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-indigo-600 py-14 px-4 text-center">
        <h2 className="text-3xl font-black text-white mb-3">Ready to Own a Franchise?</h2>
        <p className="text-indigo-200 mb-6">Join thousands of successful franchise owners across India</p>
        <Link to="/franchises"
          className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition inline-block">
          Browse All Franchises
        </Link>
      </section>

    </div>
  );
}
