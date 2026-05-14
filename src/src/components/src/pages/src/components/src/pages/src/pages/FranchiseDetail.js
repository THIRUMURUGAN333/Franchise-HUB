import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';

const FranchiseDetail = () => {
  const { id } = useParams();
  const [franchise, setFranchise] = useState(null);

  useEffect(() => {
    api.get(`/franchises/${id}`).then(res => setFranchise(res.data));
  }, [id]);

  if (!franchise) return <div>Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{franchise.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="image-gallery">
          {franchise.images.map(img => <img key={img} src={img} alt="" className="w-full mb-2" />)}
        </div>
        <div>
          <p>{franchise.fullDescription}</p>
          <p>Investment: {franchise.investmentRange}</p>
          <p>ROI: {franchise.roi}</p>
          <ul>Requirements: {franchise.requirements.map(r => <li key={r}>{r}</li>)}</ul>
          <Link to={`/apply/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Apply Now</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FranchiseDetail;