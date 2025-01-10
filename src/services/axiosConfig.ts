import axios from "axios";

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor para añadir el token a las solicitudes
axiosInstance.interceptors.request.use(
   (config) => {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const accessToken = userData?.accessToken;

      if (accessToken && !config.url?.includes("/auth/login")) {
         config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
   },
   (error) => Promise.reject(error)
);

// Interceptor para manejar tokens expirados
axiosInstance.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;

         try {
            const userData = JSON.parse(
               localStorage.getItem("userData") || "{}"
            );
            const refreshToken = userData?.refreshToken;

            if (refreshToken) {
               // Solicitar un nuevo accessToken usando el refreshToken
               const { data } = await axios.post(
                  `${import.meta.env.VITE_API_BASE_URL}auth/refreshToken`,
                  { refreshToken }
               );

               // Extraer el nuevo accessToken del objeto `data`
               const newAccessToken = data.data.accessToken;

               // Actualizar el token en localStorage
               userData.accessToken = newAccessToken;
               localStorage.setItem("userData", JSON.stringify(userData));

               // Configurar el nuevo token en la solicitud original
               originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

               // Reintentar la solicitud original
               return axiosInstance(originalRequest);
            }
         } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            localStorage.removeItem("userData");
            window.location.href = "/login";
         }
      }

      return Promise.reject(error);
   }
);

export default axiosInstance;
