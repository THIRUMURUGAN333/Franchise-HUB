import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApplications, getFranchises, createFranchise, deleteFranchise } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [tab, setTab] = useState('applications');
  const [form, setForm] = useState({ name: '', category: 'Food', investmentRange: '', description: '', roi: '', city: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return; }
    getApplications().then(r => setApplications(r.data)).catch(() => {});
    getFranchises().then(r => setFranchises(r.data)).catch(() => {});
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createFranchise(form);
      setMsg('Franchise added!');
      getFranchises().then(r => setFranchises(r.data));
      setForm({ name: '', category: 'Food', investmentRange: '', description: '', roi: '', city: '' });
    } catch { setMsg('Failed to add'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this franchise?')) return;
    await deleteFranchise(id);
    setFranchises(franchises.filter(f => f._id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-indigo-50 rounded-2xl p-6 text-center">
          <p className="text-3xl font-bold text-indigo-600">{franchises.length}</p>
          <p className="text-gray-500 mt-1">Franchises</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-6 text-center">
          <p className="text-3xl font-bold text-green-600">{applications.length}</p>
          <p className="text-gray-500 mt-1">Applications</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['applications', 'franchises', 'add'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full font-medium capitalize transition ${tab === t ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-600 hover:bg-indigo-50'}`}>
            {t === 'add' ? 'Add Franchise' : t}
          </button>
        ))}
      </div>

      {/* Applications Tab */}
      {tab === 'applications' && (
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>{['Name', 'Email', 'Phone', 'City', 'Budget', 'Franchise', 'Date'].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr>
            </thead>
            <tbody>
              {applications.map(a => (
                <tr key={a._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{a.name}</td>
                  <td className="px-4 py-3">{a.email}</td>
                  <td className="px-4 py-3">{a.phone}</td>
                  <td className="px-4 py-3">{a.city}</td>
                  <td className="px-4 py-3">{a.budget}</td>
                  <td className="px-4 py-3">{a.franchise?.name}</td>
                  <td className="px-4 py-3">{new Date(a.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && <p className="text-center py-10 text-gray-400">No applications yet</p>}
        </div>
      )}

      {/* Franchises Tab */}
      {tab === 'franchises' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {franchises.map(f => (
            <div key={f._id} className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-bold text-lg text-gray-800">{f.name}</h3>
              <p className="text-sm text-gray-500">{f.category} • {f.investmentRange}</p>
              <button onClick={() => handleDelete(f._id)} className="mt-3 text-red-500 text-sm hover:underline">Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* Add Franchise Tab */}
      {tab === 'add' && (
        <div className="bg-white rounded-2xl shadow p-8 max-w-lg">
          {msg && <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4">{msg}</div>}
          <form onSubmit={handleAdd} className="space-y-4">
            {[['name', 'Franchise Name'], ['investmentRange', 'Investment Range'], ['description', 'Description'], ['roi', 'ROI'], ['city', 'City']].map(([field, label]) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input required value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                {['Food', 'Retail', 'Education', 'Services'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Add Franchise
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
