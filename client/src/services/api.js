import axios from 'axios';

// Works on localhost AND mobile on same network
const API = axios.create({
  baseURL: `http://${window.location.hostname}:5000/api`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getFranchises = (params) => API.get('/franchises', { params });
export const getFranchise = (id) => API.get(`/franchises/${id}`);
export const createFranchise = (data) => API.post('/franchises', data);
export const updateFranchise = (id, data) => API.put(`/franchises/${id}`, data);
export const deleteFranchise = (id) => API.delete(`/franchises/${id}`);

export const submitApplication = (data) => API.post('/applications', data);
export const getApplications = () => API.get('/applications');

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const adminLogin = (data) => API.post('/auth/admin/login', data);
