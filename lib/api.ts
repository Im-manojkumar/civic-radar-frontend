import axios from 'axios';

// In Next.js, use relative path to leverage the proxy in next.config.mjs
// or use env var for full URL
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
console.log("API baseURL =", baseURL);

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Generic response handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      console.warn("Unauthorized API call");
    }
    return Promise.reject(error);
  }
);
