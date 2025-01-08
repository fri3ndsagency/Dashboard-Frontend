// import { useState } from "react";
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
import { useUsers } from "@/hooks/services/useUser";

const UserList = () => {
   const { users, isLoading, error } = useUsers();
   //    const [isModalOpen, setIsModalOpen] = useState(false);

   if (isLoading) return <p>Cargando...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
      <div>
         <div className='flex items-center justify-between'>
            <h1 className='mt-4'>Users</h1>
            <Button
               //    onClick={() => setIsModalOpen(true)}
               variant='default'
               size='sm'
            >
               <PlusCircle /> Create User
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

                        <TableHead className='opacity-0'>Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {users.map((user) => (
                        <TableRow key={user._id}>
                           <TableCell className='font-medium'>
                              {user.firstName} {user.lastName}
                           </TableCell>
                           <TableCell>{user.email}</TableCell>

                           <TableCell className='text-right'>
                              <div className='flex justify-end gap-2'>
                                 <Button variant='outline' size='sm'>
                                    Edit
                                 </Button>

                                 {/* <Button
                                   onClick={() => {
                                      alert("todavia no anda paciencia paaa");
                                   }}
                                   variant='outline'
                                   size='sm'
                                >
                                   Summary
                                </Button> */}
                                 <Button
                                    variant='outline'
                                    size='sm'
                                    className='border-red-800'
                                 >
                                    Delete
                                 </Button>
                              </div>
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

export default UserList;
