// components/ClientsList.tsx
import { useClients } from "../../hooks/services/useClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";

const ClientsList = () => {
   const { clients, isLoading, error, createClient } = useClients();

   console.log(clients);

   const handleCreate = () => {
      const newClient = { name: "Nuevo Cliente", email: "cliente@mail.com" };
      createClient(newClient);
   };

   if (isLoading) return <p>Cargando...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
      <div>
         <h1 className="mt-4">Clients</h1>
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
                                 {client.state ? "Active" : "Inactive"}
                              </span>
                           </TableCell>
                           <TableCell className='text-right'>
                              <Button
                                 onClick={() => {
                                    alert("todavia no anda paciencia paaa");
                                 }}
                                 variant='outline'
                                 size='sm'
                              >
                                 View Details
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
         )}
      </div>
   );
};

export default ClientsList;
