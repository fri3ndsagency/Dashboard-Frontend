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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import logo from "@/assets/logo.svg";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const { login } = useAuth();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      try {
         await login(email, password);
         setIsLoading(false);
         navigate("/");
      } catch (err) {
         setError(err.message);
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
                  Login to access
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
               <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <div className='relative'>
                     <Input
                        id='password'
                        placeholder='**********'
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                     <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={togglePasswordVisibility}
                        aria-label={
                           showPassword ? "Hide password" : "Show password"
                        }
                     >
                        {showPassword ? (
                           <EyeOffIcon className='w-4 h-4 text-gray-500' />
                        ) : (
                           <EyeIcon className='w-4 h-4 text-gray-500' />
                        )}
                     </Button>
                  </div>
               </div>
            </CardContent>
            <CardFooter className='flex flex-col'>
               <Button onClick={handleSubmit} className='w-full'>
                  Sign In
               </Button>
               {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
            </CardFooter>
         </Card>
      </div>
   );
};

export default Login;
