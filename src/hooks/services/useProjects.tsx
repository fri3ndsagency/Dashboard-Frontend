import { useState, useEffect } from "react";
import { projectsService } from "@/services/projects/projectsServices";
import { Project, UpdateProjectData } from "@/interfaces/projectInterface";

export const useProjects = () => {
   const [projects, setProjects] = useState<Project[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fetchProjects = async () => {
      setIsLoading(true);
      try {
         const data: Project[] = await projectsService.getAllProjects();
         setProjects(data);
      } catch (err: unknown) {
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("An unknown error occurred while fetching projects.");
         }
      } finally {
         setIsLoading(false);
      }
   };

   const createProject = async (projectData: Omit<Project, "_id">) => {
      setIsLoading(true);
      try {
         await projectsService.createProject(projectData);
         await fetchProjects();
      } catch (err: unknown) {
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("An unknown error occurred while creating a project.");
         }
      } finally {
         setIsLoading(false);
      }
   };

   const updateProject = async (id: string, projectData: UpdateProjectData) => {
      setIsLoading(true);
      try {
         const updatedData = { ...projectData, _id: id };
         await projectsService.updateProject(id, updatedData as Project);
         await fetchProjects();
      } catch (err: unknown) {
         setError(
            err instanceof Error
               ? err.message
               : "An unknown error occurred while updating a project."
         );
      } finally {
         setIsLoading(false);
      }
   };

   const deleteProject = async (id: string) => {
      setIsLoading(true);
      try {
         await projectsService.deleteProject(id);
         await fetchProjects();
      } catch (err: unknown) {
         setError(
            err instanceof Error
               ? err.message
               : "An unknown error occurred while deleting a project."
         );
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchProjects();
   }, []);

   return {
      projects,
      isLoading,
      error,
      fetchProjects,
      createProject,
      deleteProject,
      updateProject,
   };
};
