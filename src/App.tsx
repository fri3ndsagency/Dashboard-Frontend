import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";
import { ModeToggle } from "@/components/ModeToggle/mode-toggle";

function App() {
   return (
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
         <h1>Hello moto!</h1>
         <ModeToggle />
      </ThemeProvider>
   );
}

export default App;
