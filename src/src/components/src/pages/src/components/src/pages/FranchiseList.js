import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import FranchiseCard from '../components/FranchiseCard';
import Filter from '../components/Filter';

const FranchiseList = () => {
  const [franchises, setFranchises] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    api.get('/franchises', { params }).then(res => setFranchises(res.data));
  }, [searchParams]);

  return (
    <div className="container mx-auto p-4">
      <Filter />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {franchises.map(f => <FranchiseCard key={f._id} franchise={f} />)}
      </div>
    </div>
  );
};

export default FranchiseList;
