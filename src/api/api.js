import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'; // Add `http://` for fallback

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    // 'Content-Type': 'application/json',
  },
});



export default instance;
