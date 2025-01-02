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

const ClientsList = () => {
   const { clients, isLoading, error, createClient } = useClients();
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleCreateClient = (newClient: Omit<Client, "_id">) => {
      createClient(newClient);
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
                                    Delete
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
            </div>
         )}
      </div>
   );
};

export default ClientsList;
