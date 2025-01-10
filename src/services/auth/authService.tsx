import axios from "axios";

const AUTH_SERVICE = import.meta.env.VITE_SERVICE_AUTH;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
   login: async (email: string, password: string) => {
      try {
         const response = await axios.post(
            `${API_BASE_URL}${AUTH_SERVICE}/login`,
            {
               email,
               password,
            }
         );
         return response.data;
      } catch (error: any) {
         console.error(
            "Error during login:",
            error.response?.data?.message || error.message
         );
         throw new Error(error.response?.data?.message || "Login failed");
      }
   },

   forgotPassword: async (email: string) => {
      try {
         const response = await axios.post(
            `${API_BASE_URL}${AUTH_SERVICE}/forgotPassword`,
            {
               email,
            }
         );
         return response.data;
      } catch (error: any) {
         console.error(
            "Error during forgot password:",
            error.response?.data?.message || error.message
         );
         throw new Error(
            error.response?.data?.message || "Forgot password failed"
         );
      }
   },
};
