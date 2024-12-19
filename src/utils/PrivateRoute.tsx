import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute = ({ children }) => {
   const { userData } = useAuth();

   console.log(userData)

   return userData ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
