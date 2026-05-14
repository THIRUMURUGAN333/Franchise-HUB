import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { submitApplication, getFranchise } from '../services/api';

export default function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [franchise, setFranchise] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', budget: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      getFranchise(id)
        .then(r => setFranchise(r.data))
        .catch(() => setError('Could not load franchise details.'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) { setError('Invalid franchise.'); return; }
    setLoading(true);
    setError('');
    try {
      await submitApplication({ ...form, franchise: id });
      setSuccess(true);
      setTimeout(() => navigate('/franchises'), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Submission failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="text-center py-24">
      <div className="text-6xl mb-4">✅</div>
      <h2 className="text-3xl font-bold text-green-600">Application Submitted!</h2>
      <p className="text-gray-500 mt-2">Check your email for confirmation. Redirecting...</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Apply for {franchise?.name || 'Franchise'}
      </h1>
      <p className="text-gray-500 mb-8">Fill in your details and we'll get back to you.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
        {[
          ['name', 'Full Name', 'text'],
          ['email', 'Email Address', 'email'],
          ['phone', 'Phone Number', 'tel'],
          ['city', 'City', 'text'],
          ['budget', 'Available Budget (e.g. $100k)', 'text'],
        ].map(([field, label, type]) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              required
              value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </motion.div>
  );
}
