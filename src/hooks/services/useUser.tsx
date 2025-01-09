import { useState, useEffect } from "react";
import { usersService } from "@/services/users/usersService";
import { User, UpdateUserData } from "@/interfaces/userInterface";

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

   const createUser = async (userData: Omit<User, "_id">) => {
      setIsLoading(true);
      try {
         await usersService.createUser(userData);
         await fetchUsers();
      } catch (err: unknown) {
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("An unknown error occurred while creating a user.");
         }
      } finally {
         setIsLoading(false);
      }
   };

   const updateUser = async (id: string, userData: UpdateUserData) => {
      setIsLoading(true);
      try {
         const updatedData = { ...userData, _id: id };
         await usersService.updateUser(id, updatedData as UpdateUserData);
         await fetchUsers();
      } catch (err: unknown) {
         setError(
            err instanceof Error
               ? err.message
               : "An unknown error occurred while updating a user."
         );
      } finally {
         setIsLoading(false);
      }
   };

   const deleteUser = async (id: string) => {
      setIsLoading(true);

      try {
         await usersService.deleteUser(id);
         await fetchUsers();
      } catch (err: unknown) {
         setError(
            err instanceof Error
               ? err.message
               : "An unknown error ocurred while deleting the user."
         );
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
      updateUser,
      fetchUsers,
      deleteUser,
      createUser,
   };
};
