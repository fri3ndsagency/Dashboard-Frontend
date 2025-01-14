import { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Project } from "@/interfaces/projectInterface";
import { useClients } from "@/hooks/services/useClient";

interface AddProjectModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (clientData: Omit<Project, "_id">) => void;
}

function AddProjectModal({ isOpen, onClose, onSubmit }: AddProjectModalProps) {
   const [name, setName] = useState("");
   const [clientId, setClientId] = useState<string | null>(null);

   const { clients } = useClients();

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!name || !clientId) {
         alert("Name and client are required.");
         return;
      }

      // Busca el objeto del cliente usando su ID.
      const selectedClient = clients.find((client) => client._id === clientId);
      if (!selectedClient) {
         alert("Invalid client selected.");
         return;
      }

      onSubmit({ name, client: selectedClient });
      setName("");
      setClientId(null);

      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
               <div className='grid gap-4 py-4'>
                  <div className='grid items-center grid-cols-4 gap-4'>
                     <Label htmlFor='name' className='text-right'>
                        Name
                     </Label>
                     <Input
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='col-span-3'
                     />
                  </div>
                  <div className='grid items-center grid-cols-4 gap-4'>
                     <Label htmlFor='email' className='text-right'>
                        Client
                     </Label>
                     <Select
                        value={clientId || undefined}
                        onValueChange={setClientId}
                     >
                        <SelectTrigger className='col-span-3'>
                           <SelectValue placeholder='Select Client' />
                        </SelectTrigger>
                        <SelectContent>
                           {clients &&
                              clients.map((client) => (
                                 <SelectItem
                                    key={client._id}
                                    value={client._id}
                                 >
                                    {client.name}
                                 </SelectItem>
                              ))}
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               <DialogFooter>
                  <Button type='submit'>Confirm</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}
export default AddProjectModal;
