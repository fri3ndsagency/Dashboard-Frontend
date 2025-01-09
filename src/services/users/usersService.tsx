import axiosInstance from "@/services/axiosConfig";
import { UpdateUserData } from "@/interfaces/userInterface";

const USERS_SERVICE = import.meta.env.VITE_SERVICE_USERS;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usersService = {
   getAllUsers: async () => {
      const response = await axiosInstance.get(
         `${API_BASE_URL}${USERS_SERVICE}`
      );
      return response.data;
   },

   getUserById: async (id: string) => {
      const response = await axiosInstance.get(
         `${API_BASE_URL}${USERS_SERVICE}/${id}`
      );
      return response.data;
   },

   createUser: async (userData: Omit<UpdateUserData, "_id">) => {
      const response = await axiosInstance.post(
         `${API_BASE_URL}${USERS_SERVICE}`,
         userData
      );
      return response.data;
   },

   updateUser: async (id: string, userData: UpdateUserData) => {
      const response = await axiosInstance.put(
         `${API_BASE_URL}${USERS_SERVICE}/${id}`,
         userData
      );
      return response.data;
   },

   deleteUser: async (id: string) => {
      const response = await axiosInstance.delete(
         `${API_BASE_URL}${USERS_SERVICE}/${id}`
      );
      return response.data;
   },
};
