import axios from "axios";

/**
 * The HTTP client with the Axios configuration to use for sending requests to the server
 */
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Ensures the currently logged-in user's authentication token is served with all requests to the server using the
 * correct authorization header.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;