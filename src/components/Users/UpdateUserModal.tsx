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

import { UpdateUserData } from "@/interfaces/userInterface";

interface UpdateUserModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (userData: UpdateUserData) => void;
   currentUser: UpdateUserData;
}

function UpdateUserModal({
   isOpen,
   onClose,
   onSubmit,
   currentUser,
}: UpdateUserModalProps) {
   const [firstName, setFirstName] = useState(currentUser.firstName);
   const [lastName, setLastName] = useState(currentUser.lastName);
   const [email, setEmail] = useState(currentUser.email);

   useEffect(() => {
      if (isOpen) {
         setFirstName(currentUser.firstName ?? "");
         setLastName(currentUser.lastName ?? "");
         setEmail(currentUser.email ?? "");
      }
   }, [isOpen]);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!firstName || !lastName || !email) {
         alert("Name and email are required.");
         return;
      }
      onSubmit({ firstName, lastName, email });
      setFirstName("");
      setLastName("");
      setEmail("");

      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Update User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
               <div className='grid gap-4 py-4'>
                  <div className='grid items-center grid-cols-4 gap-4'>
                     <Label htmlFor='firstName' className='text-right'>
                        First Name
                     </Label>
                     <Input
                        id='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='col-span-3'
                     />
                  </div>
                  <div className='grid items-center grid-cols-4 gap-4'>
                     <Label htmlFor='lastName' className='text-right'>
                        Last Name
                     </Label>
                     <Input
                        id='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                  <Button type='submit'>Update User</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}

export default UpdateUserModal;