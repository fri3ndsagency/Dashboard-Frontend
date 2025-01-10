import axios from "axios";

const AUTH_SERVICE = import.meta.env.VITE_SERVICE_AUTH;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
   login: async (email: string, password: string) => {
      try {
         const response = await axios.post(`${API_BASE_URL}${AUTH_SERVICE}`, {
            email,
            password,
         });
         return response.data;
      } catch (error: unknown) {
         if (error instanceof Error) {
            console.error("Login failed:", error.message);
            throw error;
         } else {
            console.error("An unexpected error occurred");
            throw new Error("An unexpected error occurred");
         }
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
      } catch (error: unknown) {
         if (error instanceof Error) {
            console.error("Forgot password failed:", error.message);
            throw error;
         } else {
            console.error("An unexpected error occurred");
            throw new Error("An unexpected error occurred");
         }
      }
   },

   resetPassword: async (newPassword: string, token: string) => {
      try {
         const response = await axios.post(
            `${API_BASE_URL}${AUTH_SERVICE}/resetPassword`,
            {
               newPassword,
               token,
            }
         );
         return response.data;
      } catch (error: unknown) {
         if (error instanceof Error) {
            console.error("Reset failed:", error.message);
            throw error;
         } else {
            console.error("An unexpected error occurred");
            throw new Error("An unexpected error occurred");
         }
      }
   },

   refreshToken: async (refreshToken: string) => {
      try {
         const response = await axios.post(
            `${API_BASE_URL}${AUTH_SERVICE}/refreshToken`,
            {
               refreshToken,
            }
         );
         return response.data;
      } catch (error: unknown) {
         if (error instanceof Error) {
            console.error("Token refresh failed:", error.message);
            throw error;
         } else {
            console.error("An unexpected error occurred");
            throw new Error("An unexpected error occurred");
         }
      }
   },
};
