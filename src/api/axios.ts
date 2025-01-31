// src/api/axios.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://task-management-backend-k2cg.onrender.com', // Set the base URL to your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
