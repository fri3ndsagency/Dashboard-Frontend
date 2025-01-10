import axiosInstance from "@/services/axiosConfig";
import { UpdateUserData } from "@/interfaces/userInterface";

const USERS_SERVICE = import.meta.env.VITE_SERVICE_USERS;

export const usersService = {
   getAllUsers: async () => {
      const response = await axiosInstance.get(`${USERS_SERVICE}`);
      return response.data.data;
   },

   getUserById: async (id: string) => {
      const response = await axiosInstance.get(`${USERS_SERVICE}/${id}`);
      return response.data.data;
   },

   createUser: async (userData: Omit<UpdateUserData, "_id">) => {
      const response = await axiosInstance.post(`${USERS_SERVICE}`, userData);
      return response.data;
   },

   updateUser: async (id: string, userData: UpdateUserData) => {
      const response = await axiosInstance.put(
         `${USERS_SERVICE}/${id}`,
         userData
      );
      return response.data;
   },

   deleteUser: async (id: string) => {
      const response = await axiosInstance.delete(
         `${USERS_SERVICE}/${id}`
      );
      return response.data;
   },
};
