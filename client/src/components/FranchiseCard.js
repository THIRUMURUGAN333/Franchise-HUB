import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categoryColors = {
  Food: 'bg-orange-100 text-orange-700',
  Retail: 'bg-blue-100 text-blue-700',
  Education: 'bg-green-100 text-green-700',
  Services: 'bg-purple-100 text-purple-700',
};

const categoryEmoji = {
  Food: '🍔',
  Retail: '🛍️',
  Education: '📚',
  Services: '🔧',
};

export default function FranchiseCard({ franchise }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="h-48 overflow-hidden relative">
        {franchise.images?.[0] && !imgError ? (
          <>
            <img
              src={franchise.images[0]}
              alt={franchise.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {/* Category badge on image */}
            <span className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-semibold ${categoryColors[franchise.category] || 'bg-gray-100 text-gray-600'}`}>
              {franchise.category}
            </span>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center gap-2">
            <span className="text-5xl">{categoryEmoji[franchise.category] || '🏪'}</span>
            <span className="text-sm font-semibold text-gray-500">{franchise.name}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{franchise.name}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{franchise.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-indigo-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-400">Investment</p>
            <p className="text-xs font-bold text-indigo-700">{franchise.investmentRange}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-400">ROI</p>
            <p className="text-xs font-bold text-green-700">{franchise.roi}</p>
          </div>
        </div>

        <Link
          to={`/franchises/${franchise._id}`}
          className="mt-4 block text-center bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition font-semibold text-sm"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
}
