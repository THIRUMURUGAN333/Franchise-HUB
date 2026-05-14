import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFranchise } from '../services/api';

export default function FranchiseDetail() {
  const { id } = useParams();
  const [franchise, setFranchise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFranchise(id).then(r => setFranchise(r.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-400 text-xl">Loading...</div>;
  if (!franchise) return <div className="text-center py-20 text-red-400 text-xl">Franchise not found</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
          {franchise.images?.[0] ? (
            <img src={franchise.images[0]} alt={franchise.name} className="h-full w-full object-cover" />
          ) : <span className="text-8xl">🏪</span>}
        </div>
        <div className="p-8">
          <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{franchise.category}</span>
          <h1 className="text-4xl font-bold text-gray-800 mt-3">{franchise.name}</h1>
          <p className="text-gray-600 mt-4 text-lg">{franchise.fullDescription || franchise.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Investment</p>
              <p className="font-bold text-indigo-700">{franchise.investmentRange}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">ROI</p>
              <p className="font-bold text-green-700">{franchise.roi}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-bold text-purple-700">{franchise.city}</p>
            </div>
          </div>

          {franchise.requirements?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Requirements</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {franchise.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}

          <Link to={`/apply/${franchise._id}`}
            className="mt-8 block text-center bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition">
            Apply Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
