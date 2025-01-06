// services/clientsService.tsx
import axiosInstance from "@/services/axiosConfig";
import { Client } from "@/interfaces/clientInterface";

const CLIENTS_SERVICE = import.meta.env.VITE_SERVICE_CLIENTS;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const clientsService = {
   getAllClients: async () => {
      const response = await axiosInstance.get(
         `${API_BASE_URL}${CLIENTS_SERVICE}`
      );
      return response.data;
   },

   getClientById: async (id: string) => {
      const response = await axiosInstance.get(
         `${API_BASE_URL}${CLIENTS_SERVICE}/${id}`
      );
      return response.data;
   },

   createClient: async (clientData: Client) => {
      const response = await axiosInstance.post(
         `${API_BASE_URL}${CLIENTS_SERVICE}`,
         clientData
      );
      return response.data;
   },

   updateClient: async (id: string, clientData: Client) => {
      const response = await axiosInstance.put(
         `${API_BASE_URL}${CLIENTS_SERVICE}/${id}`,
         clientData
      );
      return response.data;
   },

   deleteClient: async (id: string) => {
      const response = await axiosInstance.delete(
         `${API_BASE_URL}${CLIENTS_SERVICE}/${id}`
      );
      return response.data;
   },
};
