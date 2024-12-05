import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./layout";
import DashboardView from "./views/DashboardView";
import ProjectsView from "./views/ProjectsView";
import ProjectDetailView from './views/ProjectDetailView';

function App() {
   return (
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
         <Layout>
            <Router>
               <Routes>
                  <Route path='/' element={<DashboardView />} />
                  <Route path='/projects' element={<ProjectsView />} />
                  <Route path='/projects/:id' element={<ProjectDetailView />} />
               </Routes>
            </Router>
         </Layout>
      </ThemeProvider>
   );
}

export default App;
