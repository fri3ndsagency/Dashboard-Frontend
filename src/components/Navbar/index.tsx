import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
   const { userData, logout } = useAuth();

   return (
      <div className='flex gap-2 p-2'>
         <Button variant='outline' className='rounded-full'>
            <Link to='/me'>{userData?.email}</Link>
         </Button>
         <Button onClick={logout} variant='ghost'>
            <LogOut />
         </Button>
      </div>
   );
};

export default Navbar;
