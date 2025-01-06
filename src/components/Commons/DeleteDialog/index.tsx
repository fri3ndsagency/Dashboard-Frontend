import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (id: string) => Promise<void>;
   targetId?: string | null;
}
const DeleteDialog = ({
   isOpen,
   onClose,
   onSubmit,
   targetId,
}: DeleteDialogProps) => {
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (targetId) {
         await onSubmit(targetId);
         onClose();
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
               <div className='grid gap-4 py-4'>
                  <p>This action cannot be undone. Do you want to proceed?</p>
               </div>
               <DialogFooter>
                  <Button variant='outline' onClick={onClose}>
                     Cancel
                  </Button>
                  <Button type='submit' variant='destructive'>
                     Delete
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default DeleteDialog;
