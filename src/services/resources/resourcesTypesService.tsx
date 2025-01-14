import axiosInstance from "@/services/axiosConfig";
import {
   Resource,
   UpdateResourceData,
} from "@/interfaces/resourcesTypesInterface";

const RESOURCES_TYPES_SERVICE = import.meta.env.VITE_SERVICE_RESOURCES_TYPES;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const resourceService = {
   getAllResources: async () => {
      const response = await axiosInstance.get(
         `${API_BASE_URL}${RESOURCES_TYPES_SERVICE}`
      );
      return response.data.data;
   },

   getResourceById: async (id: string) => {
      const response = await axiosInstance.get(
         `${API_BASE_URL}${RESOURCES_TYPES_SERVICE}/${id}`
      );
      return response.data.data;
   },

   createResource: async (data: Resource) => {
      const response = await axiosInstance.post(
         `${API_BASE_URL}${RESOURCES_TYPES_SERVICE}`,
         data
      );
      return response.data.data;
   },

   updateResource: async (id: string, data: UpdateResourceData) => {
      const response = await axiosInstance.put(
         `${API_BASE_URL}${RESOURCES_TYPES_SERVICE}/${id}`,
         data
      );
      return response.data.data;
   },

   deleteResource: async (id: string) => {
      const response = await axiosInstance.delete(
         `${API_BASE_URL}${RESOURCES_TYPES_SERVICE}/${id}`
      );
      return response.data.data;
   },
};
