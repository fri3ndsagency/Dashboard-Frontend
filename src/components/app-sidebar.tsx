import {
   User,
   LayoutDashboard,
   Settings,
   FolderOpen,
   WalletMinimal,
   ChevronRight,
   KeyRound,
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
import { ModeToggle } from "./ModeToggle/mode-toggle";

import { useAuth } from "@/context/AuthContext";

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

export function AppSidebar() {
   const { logout } = useAuth();
   return (
      <Sidebar variant='floating' collapsible='icon'>
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
                              <a href={item.url}>
                                 <item.icon />
                                 <span>{item.title}</span>
                              </a>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
               <SidebarGroupLabel>This meh not so much</SidebarGroupLabel>
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
                                       <a href={subItem.url}>
                                          <span>{subItem.title}</span>
                                       </a>
                                    </SidebarMenuSubButton>
                                 </SidebarMenuSubItem>
                              ))}
                           </SidebarMenuSub>
                        </CollapsibleContent>
                     </SidebarMenuItem>
                  </Collapsible>
               </SidebarMenu>
               <SidebarMenu>
                  <Collapsible
                     asChild
                     defaultOpen={false}
                     className='group/collapsible'
                  >
                     <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                           <SidebarMenuButton tooltip='My Account'>
                              {<KeyRound />}
                              <span>My Account</span>
                              <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                           </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                           <SidebarMenuSub>
                              <SidebarMenuSubItem>
                                 <SidebarMenuSubButton asChild>
                                    <a href='/me'>
                                       <span>Profile</span>
                                    </a>
                                 </SidebarMenuSubButton>
                                 <SidebarMenuSubButton asChild>
                                    <button className='w-full' onClick={logout}>
                                       <span>Logout</span>
                                    </button>
                                 </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
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
