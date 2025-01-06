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

const ClientsList = () => {
   const { clients, isLoading, error, createClient, deleteClient } =
      useClients();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
   const [selectedClientId, setSelectedClientId] = useState<string | null>(
      null
   );

   const handleCreateClient = (newClient: Omit<Client, "_id">) => {
      createClient(newClient);
   };

   const handleOpenDeleteDialog = (id: string) => {
      setSelectedClientId(id);
      setDeleteDialogOpen(true);
   };

   // Cerrar el diálogo
   const handleCloseDeleteDialog = () => {
      setDeleteDialogOpen(false);
      setSelectedClientId(null);
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
                        <TableRow key={client._id}>
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
                                    onClick={() => {
                                       alert("todavia no anda paciencia paaa");
                                    }}
                                    variant='outline'
                                    size='sm'
                                 >
                                    Edit
                                 </Button>

                                 <Button
                                    onClick={() => {
                                       alert("todavia no anda paciencia paaa");
                                    }}
                                    variant='outline'
                                    size='sm'
                                 >
                                    Summary
                                 </Button>
                                 <Button
                                    onClick={() =>
                                       handleOpenDeleteDialog(client._id)
                                    }
                                    variant='destructive'
                                    size='sm'
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
            </div>
         )}
      </div>
   );
};

export default ClientsList;
