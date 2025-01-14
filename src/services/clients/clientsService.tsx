// services/clientsService.tsx
import axiosInstance from "@/services/axiosConfig";
import { Client, UpdateClientData } from "@/interfaces/clientInterface";

const CLIENTS_SERVICE = import.meta.env.VITE_SERVICE_CLIENTS;

export const clientsService = {
   getAllClients: async () => {
      const response = await axiosInstance.get(`${CLIENTS_SERVICE}`);
      return response.data.data;
   },

   getClientById: async (id: string) => {
      const response = await axiosInstance.get(`${CLIENTS_SERVICE}/${id}`);
      return response.data;
   },

   createClient: async (clientData: Omit<Client, "_id">) => {
      const response = await axiosInstance.post(
         `${CLIENTS_SERVICE}`,
         clientData
      );
      return response.data;
   },

   updateClient: async (id: string, clientData: UpdateClientData) => {
      const response = await axiosInstance.put(
         `${CLIENTS_SERVICE}/${id}`,
         clientData
      );
      return response.data;
   },

   deleteClient: async (id: string) => {
      const response = await axiosInstance.delete(`${CLIENTS_SERVICE}/${id}`);
      return response.data;
   },
};
