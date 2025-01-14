import axiosInstance from "@/services/axiosConfig";
import { Project, UpdateProjectData } from "@/interfaces/projectInterface";

const PROJECTS_SERVICE = import.meta.env.VITE_SERVICE_PROJECTS;

export const projectsService = {
   getAllProjects: async () => {
      const response = await axiosInstance.get(`${PROJECTS_SERVICE}`);
      return response.data.data;
   },

   getProjectById: async (id: string) => {
      const response = await axiosInstance.get(`${PROJECTS_SERVICE}/${id}`);
      return response.data;
   },

   createProject: async (projectData: Omit<Project, "_id">) => {
      const response = await axiosInstance.post(
         `${PROJECTS_SERVICE}`,
         projectData
      );
      return response.data;
   },

   updateProject: async (id: string, projectData: UpdateProjectData) => {
      const response = await axiosInstance.put(
         `${PROJECTS_SERVICE}/${id}`,
         projectData
      );
      return response.data;
   },

   deleteProject: async (id: string) => {
      const response = await axiosInstance.delete(`${PROJECTS_SERVICE}/${id}`);
      return response.data;
   },
};
