import React, { useState, useEffect } from 'react';
import api from '../services/api';
// Assume JWT middleware protects route, but add check

const Admin = () => {
  const [franchises, setFranchises] = useState([]);
  const [applications, setApplications] = useState([]);
  // Forms for add/edit/delete

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return; // Redirect if no token
    api.get('/admin/franchises', { headers: { Authorization: `Bearer ${token}` } }).then(res => setFranchises(res.data));
    api.get('/admin/applications', { headers: { Authorization: `Bearer ${token}` } }).then(res => setApplications(res.data));
  }, []);

  // Implement CRUD UI with forms
  return (
    <div className="container mx-auto p-4">
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Franchises</h2>
        {/* List with edit/delete buttons */}
        {/* Add form */}
      </section>
      <section>
        <h2>Applications</h2>
        {/* Table of apps */}
      </section>
      <section>
        <h2>Categories</h2>
        {/* Manage categories if needed */}
      </section>
    </div>
  );
};

export default Admin;