// src/api/axios.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Set the base URL to your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
