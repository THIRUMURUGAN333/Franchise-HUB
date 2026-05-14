import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import FranchiseList from './pages/FranchiseList';
import FranchiseDetail from './pages/FranchiseDetail';
import Apply from './pages/Apply';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

import ChatBot from './components/ChatBot';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <main className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/franchises" element={<FranchiseList />} />
            <Route path="/franchises/:id" element={<FranchiseDetail />} />
            <Route path="/apply/:id" element={<Apply />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <ChatBot />
      </BrowserRouter>
    </AuthProvider>
  );
}
