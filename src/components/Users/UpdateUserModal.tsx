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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

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
   const [role, setRole] = useState(currentUser.role);

   useEffect(() => {
      if (isOpen) {
         setFirstName(currentUser.firstName ?? "");
         setLastName(currentUser.lastName ?? "");
         setEmail(currentUser.email ?? "");
         setRole(currentUser.role ?? "");
      }
   }, [isOpen]);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!firstName || !lastName || !email || !role) {
         alert("All fields are required.");
         return;
      }
      onSubmit({ firstName, lastName, email, role });
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");

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
                  <div className='grid items-center grid-cols-4 gap-4'>
                     <Label htmlFor='email' className='text-right'>
                        Role
                     </Label>
                     <Select value={role} onValueChange={setRole}>
                        <SelectTrigger className='col-span-3'>
                           <SelectValue placeholder='Select Role' />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value='Member'>Member</SelectItem>
                           <SelectItem value='Client'>Client</SelectItem>
                           <SelectItem value='Admin'>Admin</SelectItem>
                           <SelectItem value='Guest'>Guest</SelectItem>
                           <SelectItem value='Moderator'>Moderator</SelectItem>
                        </SelectContent>
                     </Select>
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
