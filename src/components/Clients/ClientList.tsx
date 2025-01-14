// components/ClientsList.tsx
import { useState } from "react";
import { useClients } from "../../hooks/services/useClient";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import AddClientModal from "./AddClientModal";
import { Client } from "@/interfaces/clientInterface";
import DeleteDialog from "../Commons/DeleteDialog";
import UpdateClientModal from "./UpdateClientModal";

const ClientsList = () => {
   const {
      clients,
      isLoading,
      error,
      createClient,
      deleteClient,
      updateClient,
   } = useClients();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
   const [selectedClientId, setSelectedClientId] = useState<string | null>(
      null
   );
   const [editDialogOpen, setEditDialogOpen] = useState(false);
   const [clientToEdit, setClientToEdit] = useState<Client | null>(null);


   const handleCreateClient = (newClient: Omit<Client, "_id">) => {
      createClient(newClient);
   };

   const handleOpenDeleteDialog = (id: string) => {
      setSelectedClientId(id);
      setDeleteDialogOpen(true);
   };

   const handleCloseDeleteDialog = () => {
      setDeleteDialogOpen(false);
      setSelectedClientId(null);
   };

   const handleOpenEditDialog = (client: Client) => {
      setClientToEdit(client);
      setEditDialogOpen(true);
   };

   const handleCloseEditDialog = () => {
      setEditDialogOpen(false);
      setClientToEdit(null);
   };

   const handleEditClient = (updatedClient: Omit<Client, "_id">) => {
      if (clientToEdit) {
         updateClient(clientToEdit._id, updatedClient);
         handleCloseEditDialog();
      }
   };

   if (isLoading) return <p>Cargando...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
      <div>
         <div className='flex items-center justify-between'>
            <h1 className='mt-4'>Clients</h1>
            <Button
               onClick={() => setIsModalOpen(true)}
               variant='default'
               size='sm'
            >
               <PlusCircle /> Create Client
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
                        <TableHead>State</TableHead>
                        <TableHead className='opacity-0'>Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {clients.map((client) => (
                        <TableRow
                           key={client._id}
                           className={client.active ? undefined : "opacity-50"}
                        >
                           <TableCell className='font-medium'>
                              {client.name}
                           </TableCell>
                           <TableCell>{client.email}</TableCell>
                           <TableCell>
                              <span className='capitalize'>
                                 {client.active ? "Active" : "Inactive"}
                              </span>
                           </TableCell>
                           <TableCell className='text-right'>
                              <div className='flex justify-end gap-2'>
                                 <Button
                                    onClick={() => handleOpenEditDialog(client)}
                                    variant='outline'
                                    size='sm'
                                 >
                                    Edit
                                 </Button>

                                 {/* <Button
                                    onClick={() => {
                                       alert("todavia no anda paciencia paaa");
                                    }}
                                    variant='outline'
                                    size='sm'
                                 >
                                    Summary
                                 </Button> */}
                                 <Button
                                    onClick={() =>
                                       handleOpenDeleteDialog(client._id)
                                    }
                                    variant='outline'
                                    size='sm'
                                    className='border-red-800'
                                 >
                                    Delete
                                 </Button>
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <AddClientModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={handleCreateClient}
               />
               <DeleteDialog
                  isOpen={deleteDialogOpen}
                  onClose={handleCloseDeleteDialog}
                  onSubmit={deleteClient}
                  targetId={selectedClientId}
               />
               <UpdateClientModal
                  isOpen={editDialogOpen}
                  onClose={handleCloseEditDialog}
                  onSubmit={handleEditClient}
                  currentClient={
                     clientToEdit || { name: "", email: "", active: false }
                  }
               />
            </div>
         )}
      </div>
   );
};

export default ClientsList;
