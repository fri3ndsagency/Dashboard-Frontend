// hooks/useClients.tsx
import { useState, useEffect } from "react";
import { clientsService } from "@/services/clients/clientsService";

export const useClients = () => {
   const [clients, setClients] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const fetchClients = async () => {
      setIsLoading(true);
      try {
         const data = await clientsService.getAllClients();
         setClients(data);
      } catch (err: any) {
         setError(err.message || "Error fetching clients");
      } finally {
         setIsLoading(false);
      }
   };

   const createClient = async (clientData: any) => {
      setIsLoading(true);
      try {
         await clientsService.createClient(clientData);
         await fetchClients(); // Actualizar la lista después de crear
      } catch (err: any) {
         setError(err.message || "Error creating client");
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchClients();
   }, []);

   return {
      clients,
      isLoading,
      error,
      fetchClients,
      createClient,
   };
};
