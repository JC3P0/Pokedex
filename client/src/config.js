import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Ensure this points to your local server
});
// Setup cache with the axios instance
setupCache(api, {
  maxAge: 15 * 60 * 1000, // Cache for 15 minutes
  store: 'memory'
});

export default api;
