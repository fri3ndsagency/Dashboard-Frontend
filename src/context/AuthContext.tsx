import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [userData, setUserData] = useState(() => {
      // Verificar si hay datos de usuario en localStorage
      const storedUserData = localStorage.getItem("userData");
      return storedUserData ? JSON.parse(storedUserData) : null;
   });

   useEffect(() => {
      // Almacenar o eliminar datos de usuario en localStorage cuando cambien
      if (userData) {
         localStorage.setItem("userData", JSON.stringify(userData));
      } else {
         localStorage.removeItem("userData");
      }
   }, [userData]);

   const login = async (email: string, password: string) => {
      try {
         const { token } = await authService.login(email, password);
         setUserData({ token });
         console.log("Login successful:", { token });
      } catch (error: any) {
         console.error("Login failed:", error.message);
         throw error; // Opcional, dependiendo de cómo lo manejes en el componente
      }
   };

   const logout = () => {
      setUserData(null);
   };

   return (
      <AuthContext.Provider value={{ userData, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   return useContext(AuthContext);
};
