import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', isAdmin: false });
  const navigate = useNavigate();

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate(formData.isAdmin ? '/admin' : '/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="block w-full mb-4 p-2 border" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block w-full mb-4 p-2 border" required />
        <label>
          <input type="checkbox" name="isAdmin" onChange={handleChange} /> Admin Login
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;