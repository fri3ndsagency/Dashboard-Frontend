import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider>
         <AppSidebar />
         <main className="w-full pl-2 pr-4">
            <SidebarTrigger variant='ghost' className='mt-2' />
            {children}
         </main>
      </SidebarProvider>
   );
}
