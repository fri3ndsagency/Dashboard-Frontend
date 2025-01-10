import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router";
import logo from "@/assets/logo.svg";

const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [successMsg, setSuccessMsg] = useState<string | null>(null);

   const { forgotPassword } = useAuth();

   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      try {
         await forgotPassword(email);
         setIsLoading(false);
         setSuccessMsg("Check your email for the password recovery link");
      } catch (err) {
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("An unknown error occurred.");
         }
         setIsLoading(false);
      }
   };

   return (
      <div className='flex items-center justify-center min-h-screen bg-background'>
         <Card className='w-full max-w-lg bg-sidebar'>
            <CardHeader className='flex flex-col items-center space-y-1'>
               <div className='w-32 h-32 mb-4'>
                  <img
                     src={logo}
                     alt='Brand Logo'
                     className='object-contain w-full h-full'
                  />
               </div>
               <h2 className='text-2xl font-bold text-center'>
                  ¿Forgot your password?
               </h2>
            </CardHeader>
            <CardContent className='space-y-4'>
               <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                     id='email'
                     type='email'
                     placeholder='name@example.com'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>
            </CardContent>
            <CardFooter className='flex flex-col'>
               <Button disabled={isLoading} onClick={handleSubmit} className='w-full'>
                  {isLoading ? "Please wait..." : "Recover my password"}
               </Button>
               {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
               {successMsg && (
                  <p className='mt-2 text-sm text-green-600'>{successMsg}</p>
               )}
               <Button className='mt-3 text-foreground' variant='link'>
                  <Link to='/login'>¿Remember your password? Login</Link>
               </Button>
            </CardFooter>
         </Card>
      </div>
   );
};

export default ForgotPassword;
