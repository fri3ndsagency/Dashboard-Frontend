import {
   User,
   LayoutDashboard,
   Settings,
   FolderOpen,
   WalletMinimal,
   ChevronRight,
} from "lucide-react";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggle/mode-toggle";

// Menu items.
const items = [
   {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
   },
   {
      title: "Clients",
      url: "/clients",
      icon: User,
   },
   {
      title: "Budgets",
      url: "/budgets",
      icon: WalletMinimal,
   },
   {
      title: "Projects",
      url: "/projects",
      icon: FolderOpen,
   },
];

const itemsFooter = [
   {
      title: "Concepts",
      url: "/concepts",
      icon: LayoutDashboard,
   },
   {
      title: "Users",
      url: "/users",
      icon: User,
   },
   {
      title: "Resources",
      url: "/resources",
      icon: WalletMinimal,
   },
];

export function AppSidebar() {
   return (
      <Sidebar variant='floating' collapsible='icon' className='px-2 py-4'>
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>
                  This is the important stuff
               </SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild tooltip={item.title}>
                              <Link to={`${item.url}`}>
                                 <item.icon />
                                 <span>{item.title}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
               <SidebarGroupLabel className="pointer-events-none">This meh not so much</SidebarGroupLabel>
               <SidebarMenu>
                  <Collapsible
                     asChild
                     defaultOpen={false}
                     className='group/collapsible'
                  >
                     <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                           <SidebarMenuButton tooltip='Settings'>
                              {<Settings />}
                              <span>Settings</span>
                              <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                           </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                           <SidebarMenuSub>
                              {itemsFooter?.map((subItem) => (
                                 <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                       <Link to={`${subItem.url}`}>
                                          <span>{subItem.title}</span>
                                       </Link>
                                    </SidebarMenuSubButton>
                                 </SidebarMenuSubItem>
                              ))}
                           </SidebarMenuSub>
                        </CollapsibleContent>
                     </SidebarMenuItem>
                  </Collapsible>
               </SidebarMenu>
            </SidebarGroup>
         </SidebarContent>
         <SidebarFooter></SidebarFooter>
         <div className='flex items-center justify-between w-full p-2 '>
            <ModeToggle />
         </div>
      </Sidebar>
   );
}
