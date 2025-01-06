import axios from "axios";

// Axios instance oluşturma
const httpClient = axios.create({
  baseURL: "https://api.themoviedb.org/3", // API'nizin temel URL'si
  timeout: 10000, // Zaman aşımı süresi
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Authorization token'ı ekleyin
    // const token = localStorage.getItem("guest_session_id");
    if (import.meta.env.VITE_TMDB_TOKEN) {
      config.headers.Authorization = `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Özel hata yönetimi
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Gerekirse logout işlemi veya yönlendirme yapılabilir
    }
    return Promise.reject(error);
  }
);

export default httpClient;
