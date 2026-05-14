import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FranchiseCard = ({ franchise }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded p-4">
      <img src={franchise.images[0]} alt={franchise.name} className="w-full h-32 object-cover mb-2" />
      <h3 className="text-xl font-bold">{franchise.name}</h3>
      <p>{franchise.investmentRange}</p>
      <p>{franchise.description}</p>
      <Link to={`/franchise/${franchise._id}`} className="text-blue-500">Details</Link>
    </motion.div>
  );
};

export default FranchiseCard;
