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
import { Client } from "@/interfaces/clientInterface";

interface AddClientModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (clientData: Omit<Client, "_id">) => void;
}

function AddClientModal({ isOpen, onClose, onSubmit }: AddClientModalProps) {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!name || !email) {
         alert("Name and email are required.");
         return;
      }
      onSubmit({ name, email, active: true });
      setName("");
      setEmail("");

      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Add New Client</DialogTitle>
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
                        Email
                     </Label>
                     <Input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='col-span-3'
                     />
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

export default AddClientModal;
