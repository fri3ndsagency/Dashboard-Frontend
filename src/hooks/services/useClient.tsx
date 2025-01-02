// hooks/useClients.tsx
import { useState, useEffect } from "react";
import { clientsService } from "@/services/clients/clientsService";
import { Client } from "@/interfaces/clientInterface";

export const useClients = () => {
   const [clients, setClients] = useState<Client[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fetchClients = async () => {
      setIsLoading(true);
      try {
         const data: Client[] = await clientsService.getAllClients();
         setClients(data);
      } catch (err: unknown) {
         // Cambia 'any' por 'unknown'
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("An unknown error occurred while fetching clients.");
         }
      } finally {
         setIsLoading(false);
      }
   };

   const createClient = async (clientData: Omit<Client, "_id">) => {
      setIsLoading(true);
      try {
         await clientsService.createClient(clientData);
         await fetchClients();
      } catch (err: unknown) {
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("An unknown error occurred while creating a client.");
         }
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
