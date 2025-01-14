import axiosInstance from "@/services/axiosConfig";
import { Project, UpdateProjectData } from "@/interfaces/projectInterface";

const PROJECTS_SERVICE = import.meta.env.VITE_SERVICE_PROJECTS;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const projectsService = {
   getAllProjects: async () => {
      const response = await axiosInstance.get(
         `${API_BASE_URL}${PROJECTS_SERVICE}`
      );
      return response.data.data;
   },

   getProjectById: async (id: string) => {
      const response = await axiosInstance.get(
         `${API_BASE_URL}${PROJECTS_SERVICE}/${id}`
      );
      return response.data;
   },

   createProject: async (projectData: Omit<Project, "_id">) => {
      const response = await axiosInstance.post(
         `${API_BASE_URL}${PROJECTS_SERVICE}`,
         projectData
      );
      return response.data;
   },

   updateProject: async (id: string, projectData: UpdateProjectData) => {
      const response = await axiosInstance.put(
         `${API_BASE_URL}${PROJECTS_SERVICE}/${id}`,
         projectData
      );
      return response.data;
   },

   deleteProject: async (id: string) => {
      const response = await axiosInstance.delete(
         `${API_BASE_URL}${PROJECTS_SERVICE}/${id}`
      );
      return response.data;
   },
};
