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
import UsersView from "./views/UsersView";
import ForgotPasswordView from "./views/ForgotPasswordView";
import ResetPasswordView from "./views/ResetPasswordView";
import BudgetsView from "./views/BudgetsView";
import ConceptsView from "./views/ConceptsView";
import ResourcesTypesView from "./views/ResourcesTypesView";
import ProfileView from "./views/ProfileView";

function App() {
   return (
      <AuthProvider>
         <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <Router>
               <Routes>
                  <Route path='/login' element={<LoginView />} />
                  <Route
                     path='/forgot-password'
                     element={<ForgotPasswordView />}
                  />
                  <Route
                     path='/reset-password/:token'
                     element={<ResetPasswordView />}
                  />
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
                     path='/users'
                     element={
                        <PrivateRoute>
                           <Layout>
                              <UsersView />
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
                  <Route
                     path='/budgets'
                     element={
                        <PrivateRoute>
                           <Layout>
                              <BudgetsView />
                           </Layout>
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path='/concepts'
                     element={
                        <PrivateRoute>
                           <Layout>
                              <ConceptsView />
                           </Layout>
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path='/resources-types'
                     element={
                        <PrivateRoute>
                           <Layout>
                              <ResourcesTypesView />
                           </Layout>
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path='/me'
                     element={
                        <PrivateRoute>
                           <Layout>
                              <ProfileView />
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
