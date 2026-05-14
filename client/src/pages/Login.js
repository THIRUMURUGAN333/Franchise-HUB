import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login, register, adminLogin } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('login'); // login | register | admin
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      let res;
      if (mode === 'register') res = await register(form);
      else if (mode === 'admin') res = await adminLogin(form);
      else res = await login(form);
      loginUser(res.data.user, res.data.token);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/franchises');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {mode === 'register' ? 'Create Account' : mode === 'admin' ? 'Admin Login' : 'Welcome Back'}
        </h1>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input type="text" placeholder="Full Name" required value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          )}
          <input type="email" placeholder="Email" required value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          <input type="password" placeholder="Password" required value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          <button type="submit" disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
            {loading ? 'Please wait...' : mode === 'register' ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
          {mode !== 'register' && <button onClick={() => setMode('register')} className="text-indigo-600 hover:underline block w-full">Create an account</button>}
          {mode !== 'login' && <button onClick={() => setMode('login')} className="text-indigo-600 hover:underline block w-full">Login instead</button>}
          {mode !== 'admin' && <button onClick={() => setMode('admin')} className="text-gray-400 hover:underline block w-full">Admin login</button>}
        </div>
      </div>
    </motion.div>
  );
}
