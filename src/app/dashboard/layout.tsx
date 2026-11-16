import { headers } from "next/headers";
import { redirect } from "next/navigation";

import DashboardSidebar from "@/app/components/DashboardSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

// The dashboard reads the session, so it renders on every request.
export const instant = false;

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const userRole = session.user.role;
  const role: "seeker" | "recruiter" | "admin" =
    userRole === "recruiter" || userRole === "admin" ? userRole : "seeker";

  return (
    <SidebarProvider
      className="bg-[#08080a]"
      style={
        {
          "--sidebar-width": "248px",
          "--sidebar": "#08080a",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar
        user={{
          name: session.user.name,
          email: session.user.email,
          role,
        }}
      />

      <SidebarInset className="border border-white/[0.07] bg-[#0e0e11]">
        {/* Mobile bar: the sidebar turns into a sheet below md */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-2 md:hidden">
          <SidebarTrigger />
          <span className="text-sm font-medium text-[#a0a0ab]">
            HireLoop Dashboard
          </span>
        </div>

        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
