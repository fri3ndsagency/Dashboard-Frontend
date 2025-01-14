import axiosInstance from "@/services/axiosConfig";
import {
   Resource,
   UpdateResourceData,
} from "@/interfaces/resourcesTypesInterface";

const RESOURCES_TYPES_SERVICE = import.meta.env.VITE_SERVICE_RESOURCES_TYPES;

export const resourceService = {
   getAllResources: async () => {
      const response = await axiosInstance.get(`${RESOURCES_TYPES_SERVICE}`);
      return response.data.data;
   },

   getResourceById: async (id: string) => {
      const response = await axiosInstance.get(
         `${RESOURCES_TYPES_SERVICE}/${id}`
      );
      return response.data.data;
   },

   createResource: async (data: Resource) => {
      const response = await axiosInstance.post(
         `${RESOURCES_TYPES_SERVICE}`,
         data
      );
      return response.data.data;
   },

   updateResource: async (id: string, data: UpdateResourceData) => {
      const response = await axiosInstance.put(
         `${RESOURCES_TYPES_SERVICE}/${id}`,
         data
      );
      return response.data.data;
   },

   deleteResource: async (id: string) => {
      const response = await axiosInstance.delete(
         `${RESOURCES_TYPES_SERVICE}/${id}`
      );
      return response.data.data;
   },
};
