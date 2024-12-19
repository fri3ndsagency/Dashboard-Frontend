import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import PrivateRoute from "./utils/PrivateRoute";
import DashboardView from "./views/DashboardView";
import ProjectsView from "./views/ProjectsView";
import ClientsView from "./views/ClientsView";
import LoginView from "./views/LoginView";
import { AuthProvider } from "./context/AuthContext";

function App() {
   return (
      <AuthProvider>
         <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <Router>
               <Routes>
                  <Route path='/login' element={<LoginView />} />
                  <Route
                     path='/'
                     element={
                        <PrivateRoute>
                           <Layout>
                              <DashboardView />
                           </Layout>
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path='/clients'
                     element={
                        <PrivateRoute>
                           <Layout>
                              <ClientsView />
                           </Layout>
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path='/projects'
                     element={
                        <PrivateRoute>
                           <Layout>
                              <ProjectsView />
                           </Layout>
                        </PrivateRoute>
                     }
                  />
               </Routes>
            </Router>
         </ThemeProvider>
      </AuthProvider>
   );
}

export default App;
