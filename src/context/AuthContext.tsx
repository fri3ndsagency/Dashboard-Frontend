/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth/authService";

// Interfaz para los datos de usuario
interface UserData {
   accessToken: string;
   refreshToken: string;
   email: string;
}

// Interfaz para el contexto de autenticación
interface AuthContextType {
   userData: UserData | null;
   login: (email: string, password: string) => Promise<void>;
   logout: () => void;
   forgotPassword: (email: string) => Promise<void>;
   resetPassword: (token: string, newPassword: string) => Promise<void>;
   refreshAccessToken: () => Promise<void>;
}

// Crear el contexto con un valor inicial tipado
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [userData, setUserData] = useState<UserData | null>(() => {
      const storedUserData = localStorage.getItem("userData");
      return storedUserData ? JSON.parse(storedUserData) : null;
   });

   useEffect(() => {
      if (userData) {
         localStorage.setItem("userData", JSON.stringify(userData));
      } else {
         localStorage.removeItem("userData");
      }
   }, [userData]);

   const login = async (email: string, password: string): Promise<void> => {
      try {
         const response = await authService.login(email, password);
         const { accessToken, refreshToken } = response.data;

         setUserData({ accessToken, refreshToken, email });
      } catch (error: unknown) {
         if (error instanceof Error) {
            console.error("Login failed:", error.message);
            throw error;
         } else {
            console.error("An unexpected error occurred");
            throw new Error("An unexpected error occurred");
         }
      }
   };

   const forgotPassword = async (email: string): Promise<void> => {
      try {
         await authService.forgotPassword(email);
         console.log("Password reset email sent");
      } catch (error: unknown) {
         if (error instanceof Error) {
            console.error("Forgot password failed:", error.message);
            throw error;
         } else {
            console.error("An unexpected error occurred");
            throw new Error("An unexpected error occurred");
         }
      }
   };

   const resetPassword = async (newPassword: string, token: string) => {
      try {
         const response = await authService.resetPassword(newPassword, token);
         console.log(response);
      } catch (error) {
         if (error instanceof Error) {
            console.error("Reset password failed:", error.message);
            throw error;
         } else {
            console.error("An unexpected error occurred");
            throw new Error("An unexpected error occurred");
         }
      }
   };

   const logout = (): void => {
      setUserData(null);
   };

   const refreshAccessToken = async (): Promise<void> => {
      if (!userData?.refreshToken) {
         console.error("No refresh token available.");
         logout();
         return;
      }

      try {
         const response = await authService.refreshToken(userData.refreshToken);
         const { accessToken } = response.data.data;

         setUserData((prev) => (prev ? { ...prev, accessToken } : null));
      } catch (error) {
         console.error("Failed to refresh token:", error);
         logout();
      }
   };

   return (
      <AuthContext.Provider
         value={{
            userData,
            login,
            logout,
            forgotPassword,
            resetPassword,
            refreshAccessToken,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = (): AuthContextType => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
