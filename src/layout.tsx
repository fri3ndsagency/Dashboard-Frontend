import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "./components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider>
         <AppSidebar />
         <main className='w-full pl-2 pr-4'>
            <div className='flex items-center justify-between w-full mt-2'>
               {" "}
               <SidebarTrigger variant='ghost' />
               <Navbar />
            </div>
            {children}
         </main>
      </SidebarProvider>
   );
}
