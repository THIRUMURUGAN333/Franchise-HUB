import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFranchises } from '../services/api';

const CATEGORIES = ['All', 'Food', 'Retail', 'Education', 'Services'];
const CITIES = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Nationwide'];

const categoryColors = {
  Food: 'bg-orange-100 text-orange-700',
  Retail: 'bg-blue-100 text-blue-700',
  Education: 'bg-green-100 text-green-700',
  Services: 'bg-purple-100 text-purple-700',
};

const categoryEmoji = {
  Food: '🍽️', Retail: '🛍️', Education: '🎓', Services: '🔧',
};

function FranchiseListCard({ franchise }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative w-full md:w-56 h-44 md:h-auto flex-shrink-0">
        {franchise.images?.[0] && !imgError ? (
          <img
            src={franchise.images[0]}
            alt={franchise.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <span className="text-5xl">{categoryEmoji[franchise.category] || '🏪'}</span>
          </div>
        )}
        {/* Badges */}
        <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
          Featured
        </span>
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
          Open
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-black text-gray-800">{franchise.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold mt-1 inline-block ${categoryColors[franchise.category] || 'bg-gray-100 text-gray-600'}`}>
                {franchise.category}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-300 transition">
                ♡
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{franchise.description}</p>

          <div className="mt-3 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>📍</span>
              <span>{franchise.city || 'Nationwide'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>💰</span>
              <span className="font-semibold text-indigo-600">{franchise.investmentRange}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>📈</span>
              <span>ROI: <span className="font-semibold text-green-600">{franchise.roi}</span></span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <Link
            to={`/franchises/${franchise._id}`}
            className="flex-1 text-center bg-indigo-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
          >
            View Details
          </Link>
          <Link
            to={`/apply/${franchise._id}`}
            className="flex-1 text-center border-2 border-indigo-600 text-indigo-600 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function FranchiseList() {
  const [franchises, setFranchises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All Cities');
  const [priceMax, setPriceMax] = useState(100);
  const [sortBy, setSortBy] = useState('Default');
  const [viewMode, setViewMode] = useState('list'); // list | grid
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'All';

  useEffect(() => {
    setLoading(true);
    getFranchises({ category: category !== 'All' ? category : undefined, search })
      .then(r => setFranchises(r.data))
      .finally(() => setLoading(false));
  }, [category, search]);

  const sorted = [...franchises].sort((a, b) => {
    if (sortBy === 'Popular') return b.popularity - a.popularity;
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Filter Bar */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="What are you looking for?"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {/* Category */}
            <select
              value={category}
              onChange={e => setSearchParams(e.target.value !== 'All' ? { category: e.target.value } : {})}
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>

            {/* City */}
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
            >
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>

            <button
              onClick={() => { setSearch(''); setCity('All Cities'); setSearchParams({}); }}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
            >
              Find Listing
            </button>
          </div>

          {/* Price Range */}
          <div className="mt-3 flex items-center gap-4">
            <span className="text-sm text-gray-500 font-medium">Price Range:</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">₹0</span>
            <input
              type="range" min="0" max="100" value={priceMax}
              onChange={e => setPriceMax(e.target.value)}
              className="flex-1 max-w-xs accent-indigo-600"
            />
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">
              ₹{(priceMax * 110000).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Results header */}
        <div className="flex justify-between items-center mb-5">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-800">{sorted.length}</span> results
            {category !== 'All' && <span> in <span className="text-indigo-600 font-semibold">{category}</span></span>}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none bg-white">
                {['Default', 'Popular', 'Name'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            {/* View toggle */}
            <div className="flex gap-1">
              <button onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-400'}`}>
                ⊞
              </button>
              <button onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-400'}`}>
                ☰
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">⏳</div>
            <p>Loading franchises...</p>
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p>No franchises found. Try a different search.</p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="flex flex-col gap-4">
            {sorted.map(f => <FranchiseListCard key={f._id} franchise={f} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map(f => (
              <motion.div key={f._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-44 relative overflow-hidden">
                  {f.images?.[0] ? (
                    <img src={f.images[0]} alt={f.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-4xl">
                      {categoryEmoji[f.category] || '🏪'}
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-lg">Featured</span>
                </div>
                <div className="p-4">
                  <h3 className="font-black text-gray-800">{f.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{f.description}</p>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-indigo-600 font-bold">{f.investmentRange}</span>
                    <span className="text-green-600 font-bold">{f.roi}</span>
                  </div>
                  <Link to={`/franchises/${f._id}`}
                    className="mt-3 block text-center bg-indigo-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
