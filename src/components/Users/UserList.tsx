import { useState } from "react";
// import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/services/useUser";
import { PlusCircle } from "lucide-react";
import UpdateUserModal from "./UpdateUserModal";
import { UpdateUserData, User } from "@/interfaces/userInterface";
import DeleteDialog from "../Commons/DeleteDialog";
import AddUserModal from "./AddUserModal";

const UserList = () => {
   const { users, isLoading, error, updateUser, deleteUser, createUser } =
      useUsers();
   const [editDialogOpen, setEditDialogOpen] = useState(false);
   const [userToEdit, setUserToEdit] = useState<User | null>(null);
   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

   //Crear
   const handleCreateUser = (newClient: Omit<User, "_id">) => {
      createUser(newClient);
   };

   //Para editar
   const handleOpenEditDialog = (client: User) => {
      setUserToEdit(client);
      setEditDialogOpen(true);
   };

   const handleCloseEditDialog = () => {
      setEditDialogOpen(false);
      setUserToEdit(null);
   };

   const handleEditUser = (updatedUser: Omit<UpdateUserData, "_id">) => {
      if (userToEdit) {
         updateUser(userToEdit._id, updatedUser);
         handleCloseEditDialog();
      }
   };

   //Para eliminar
   const handleOpenDeleteDialog = (id: string) => {
      setSelectedUserId(id);
      setDeleteDialogOpen(true);
   };

   const handleCloseDeleteDialog = () => {
      setDeleteDialogOpen(false);
      setSelectedUserId(null);
   };

   if (isLoading) return <p>Cargando...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
      <div>
         <div className='flex items-center justify-between'>
            <h1 className='mt-4'>Users</h1>
            <Button
               onClick={() => setIsModalOpen(true)}
               variant='default'
               size='sm'
            >
               <PlusCircle /> Create User
            </Button>
         </div>
         {isLoading ? (
            <p>Loading...</p>
         ) : (
            <div className='mt-4'>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className='opacity-0'>Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {users.map((user) => (
                        <TableRow key={user._id}>
                           <TableCell className='font-medium'>
                              {user.firstName} {user.lastName}
                           </TableCell>
                           <TableCell>{user.email}</TableCell>
                           <TableCell>{user.role}</TableCell>

                           <TableCell className='text-right'>
                              <div className='flex justify-end gap-2'>
                                 <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() => handleOpenEditDialog(user)}
                                 >
                                    Edit
                                 </Button>
                                 <Button
                                    variant='outline'
                                    size='sm'
                                    className='border-red-800'
                                    onClick={() =>
                                       handleOpenDeleteDialog(user._id)
                                    }
                                 >
                                    Delete
                                 </Button>
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <UpdateUserModal
                  isOpen={editDialogOpen}
                  onClose={handleCloseEditDialog}
                  onSubmit={handleEditUser}
                  currentUser={
                     userToEdit || { firstName: "", lastName: "", email: "" }
                  }
               />
               <DeleteDialog
                  isOpen={deleteDialogOpen}
                  onClose={handleCloseDeleteDialog}
                  onSubmit={deleteUser}
                  targetId={selectedUserId}
               />
               <AddUserModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={handleCreateUser}
               />
            </div>
         )}
      </div>
   );
};

export default UserList;
