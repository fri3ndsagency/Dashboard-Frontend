import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider>
         <AppSidebar />
         <main className='w-full pl-2 pr-4'>
            <div className='flex items-center mt-2'>
               {" "}
               <SidebarTrigger variant='ghost' />
               <div className='flex text-xs'>Or press ⌘ + B</div>
            </div>

            {children}
         </main>
      </SidebarProvider>
   );
}
