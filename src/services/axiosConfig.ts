import axios from "axios";
const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
   (config) => {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const token = userData?.token;

      // Evitar enviar token en rutas específicas (como auth/login)
      if (token && !config.url?.includes("/auth/login")) {
         config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
   },
   (error) => Promise.reject(error)
);

export default axiosInstance;
