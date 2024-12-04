import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";

import Layout from "./layout";

function App() {
   return (
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
         <Layout>
            <div className='flex w-full flex-col items-center justify-center gap-4 p-4'>
               <h1>Budget Calculator</h1>
            </div>
         </Layout>
      </ThemeProvider>
   );
}

export default App;
