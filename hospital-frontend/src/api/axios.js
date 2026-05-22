// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  // ✅ Ensure this matches your backend mount point
  // If backend is http://localhost:3000, use:
  baseURL: 'http://localhost:3000/api/v1', 
  
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;