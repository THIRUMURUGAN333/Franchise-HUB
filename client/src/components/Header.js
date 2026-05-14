import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-black text-lg">F</span>
          </div>
          <div>
            <span className="text-xl font-black text-indigo-600">Franchise</span>
            <span className="text-xl font-black text-gray-800">Hub</span>
            <p className="text-xs text-gray-400 leading-none">Let's begin with us</p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-8 items-center text-gray-600 font-medium text-sm">
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link to="/franchises" className="hover:text-indigo-600 transition">Franchises</Link>
          <Link to="/franchises?category=Food" className="hover:text-indigo-600 transition">Categories</Link>
          {user?.role === 'admin' && <Link to="/admin" className="hover:text-indigo-600 transition">Admin</Link>}
          {user ? (
            <button onClick={handleLogout} className="text-red-500 hover:text-red-600 transition">Logout</button>
          ) : (
            <Link to="/login" className="hover:text-indigo-600 transition">Login</Link>
          )}
        </nav>

        {/* CTA Button */}
        <Link to="/login"
          className="hidden md:block bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition">
          + Add Listing
        </Link>

        {/* Mobile menu */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-gray-700 font-medium border-t">
          <Link to="/" onClick={() => setOpen(false)} className="pt-3">Home</Link>
          <Link to="/franchises" onClick={() => setOpen(false)}>Franchises</Link>
          {user?.role === 'admin' && <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>}
          {user ? (
            <button onClick={handleLogout} className="text-left text-red-500">Logout</button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          )}
          <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-center">+ Add Listing</Link>
        </div>
      )}
    </header>
  );
}
