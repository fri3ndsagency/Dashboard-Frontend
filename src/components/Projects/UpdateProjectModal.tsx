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
import { UpdateProjectData } from "@/interfaces/projectInterface";
import { useClients } from "@/hooks/services/useClient";

interface UpdateProjectModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (projectData: UpdateProjectData) => void;
   currentProject: UpdateProjectData;
}

function UpdateProjectModal({
   isOpen,
   onClose,
   onSubmit,
   currentProject,
}: UpdateProjectModalProps) {
   const [name, setName] = useState(currentProject.name);
   const [clientId, setClientId] = useState<string | null>(
      currentProject.client || null
   );
   const [state, setState] = useState(currentProject.state);

   const { clients } = useClients();

   useEffect(() => {
      if (isOpen) {
         setName(currentProject.name || "");
         setClientId(currentProject.client || null);
         setState(currentProject.state || "");
      }
   }, [isOpen, currentProject]);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!name || !clientId) {
         alert("Name and client are required.");
         return;
      }

      onSubmit({ name, client: clientId, state });
      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Update Project</DialogTitle>
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
                     <Label htmlFor='client' className='text-right'>
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
                           {clients.map((client) => (
                              <SelectItem key={client._id} value={client._id}>
                                 {client.name}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>

                  <div className='grid items-center grid-cols-4 gap-4'>
                     <Label htmlFor='email' className='text-right'>
                        State
                     </Label>
                     <Select value={state} onValueChange={setState}>
                        <SelectTrigger className='col-span-3'>
                           <SelectValue placeholder='Select State' />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value='Initial'>Initial</SelectItem>
                           <SelectItem value='In Progress'>
                              In Progress
                           </SelectItem>
                           <SelectItem value='On Hold'>On Hold</SelectItem>
                           <SelectItem value='Canceled'>Canceled</SelectItem>
                           <SelectItem value='Completed'>Completed</SelectItem>
                           <SelectItem value='Archived'>Archived</SelectItem>
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

export default UpdateProjectModal;
