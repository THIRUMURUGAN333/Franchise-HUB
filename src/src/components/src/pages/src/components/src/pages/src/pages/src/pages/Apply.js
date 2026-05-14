import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const Apply = () => {
  const { franchiseId } = useParams();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', budget: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/applications', { ...formData, franchise: franchiseId });
      alert('Application submitted!');
    } catch (err) {
      alert('Error submitting');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <input name="name" placeholder="Name" onChange={handleChange} className="block w-full mb-4 p-2 border" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="block w-full mb-4 p-2 border" required />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="block w-full mb-4 p-2 border" required />
        <input name="city" placeholder="City" onChange={handleChange} className="block w-full mb-4 p-2 border" required />
        <input name="budget" placeholder="Budget" onChange={handleChange} className="block w-full mb-4 p-2 border" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Apply;