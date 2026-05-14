import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';
import FranchiseCard from '../components/FranchiseCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [franchises, setFranchises] = useState([]);
  const categories = ['Food', 'Retail', 'Education', 'Services'];

  useEffect(() => {
    api.get('/franchises').then(res => setFranchises(res.data.slice(0, 4))); // Featured
  }, []);

  return (
    <div className="container mx-auto p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <h1 className="text-4xl font-bold mb-4">Multiple Franchises. One Platform.</h1>
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
          {franchises.map(f => <FranchiseCard key={f._id} franchise={f} />)}
        </div>
        <div className="flex justify-center space-x-4">
          {categories.map(cat => <Link key={cat} to={`/franchises?category=${cat}`} className="bg-blue-500 text-white px-4 py-2 rounded">{cat}</Link>)}
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <Link to="/franchises" className="bg-green-500 text-white px-4 py-2 rounded">Explore Franchises</Link>
          <Link to="/contact" className="bg-yellow-500 text-white px-4 py-2 rounded">Become a Partner</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;