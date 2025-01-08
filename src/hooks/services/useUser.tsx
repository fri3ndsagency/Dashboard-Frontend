import { useState, useEffect } from "react";
import { usersService } from "@/services/users/usersService";
import { User } from "@/interfaces/userInterface";

export const useUsers = () => {
   const [users, setUsers] = useState<User[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fetchUsers = async () => {
      setIsLoading(true);
      try {
         const data: User[] = await usersService.getAllUsers();
         setUsers(data);
      } catch (err: unknown) {
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("An unknown error occurred while fetching users.");
         }
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchUsers();
   }, []);

   return {
      users,
      isLoading,
      error,
      fetchUsers,
   };
};
