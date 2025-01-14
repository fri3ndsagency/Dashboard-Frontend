/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Client, UpdateClientData } from "@/interfaces/clientInterface";

interface UpdateClientModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (clientData: Omit<Client, "_id">) => void;
   currentClient: UpdateClientData;
}

function UpdateClientModal({
   isOpen,
   onClose,
   onSubmit,
   currentClient,
}: UpdateClientModalProps) {
   const [name, setName] = useState(currentClient.name);
   const [email, setEmail] = useState(currentClient.email);
   const [active, setActive] = useState(currentClient.active ?? false);

   useEffect(() => {
      if (isOpen) {
         setName(currentClient.name ?? "");
         setEmail(currentClient.email ?? "");
         setActive(currentClient.active ?? false);
      }
   }, [isOpen]);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!name || !email) {
         alert("Name and email are required.");
         return;
      }
      onSubmit({ name, email, active: active ?? false });
      setName("");
      setEmail("");

      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Update Client</DialogTitle>
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
                  <div className='flex items-center space-x-2'>
                     <Switch
                        id='active'
                        checked={active}
                        onCheckedChange={() => {
                           setActive(!active);
                        }}
                     />
                     <Label htmlFor='active'>¿Active?</Label>
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

export default UpdateClientModal;
