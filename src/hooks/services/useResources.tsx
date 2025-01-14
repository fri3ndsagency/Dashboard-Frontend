import { useState, useEffect } from "react";
import { resourceService } from "@/services/resources/resourcesTypesService";
import {
   Resource,
   UpdateResourceData,
} from "@/interfaces/resourcesTypesInterface";

export const useResourcesTypes = () => {
   const [resources, setResources] = useState<Resource[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fetchResources = async () => {
      setIsLoading(true);

      try {
         const data: Resource[] = await resourceService.getAllResources();
         setResources(data);
      } catch (err: unknown) {
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("An unknown error occurred while fetching resources.");
         }
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchResources();
   }, []);

   return {
      resources,
      isLoading,
      error,
      fetchResources,
   };
};
