import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import { Plus } from "lucide-react";

const menuItemsByRole = {
  seeker: [],
  recruiter: [],
  admin: [],
};
const DashboardSidebar = () => {
  const { data: session, isPending } = useSession();
  const role = session?.user?.role || "seeker";

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarMenu>
          {
            // menuItemsByRole[role].map((item) => (
            //   <SidebarMenuItem key={item.id}>
            //     <SidebarMenuButton render={<a href={item.url} />}>
            //       <item.icon />
            //       <span>{item.name}</span>
            //     </SidebarMenuButton>
            //   </SidebarMenuItem>
            // ))
          }
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
export default DashboardSidebar;
