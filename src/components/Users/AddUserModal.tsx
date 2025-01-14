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
import { User } from "@/interfaces/userInterface";

interface AddUserModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (userData: Omit<User, "_id">) => void;
}

function AddUserModal({ isOpen, onClose, onSubmit }: AddUserModalProps) {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [role, setRole] = useState("");
   const [email, setEmail] = useState("");

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

      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Add New User</DialogTitle>
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
                  <Button type='submit'>Confirm</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}

export default AddUserModal;
