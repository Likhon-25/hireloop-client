"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type DashboardRole = "seeker" | "recruiter" | "admin";

export type DashboardMenuItem = {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
};

// Menu structure per role, taken from the Hireloop 2.0 sidebar spec in Figma.
const menuItemsByRole: Record<DashboardRole, DashboardMenuItem[]> = {
  seeker: [
    {
      id: "seeker-dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "seeker-jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Briefcase,
    },
    {
      id: "seeker-saved-jobs",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      id: "seeker-applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "seeker-billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: Wallet,
    },
    {
      id: "seeker-settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "recruiter-dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "recruiter-company",
      name: "My Company",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },
    {
      id: "recruiter-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      id: "recruiter-add-jobs",
      name: "Add Jobs",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "recruiter-applications",
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      id: "recruiter-settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  
  admin: [
    {
      id: "admin-dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "admin-users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "admin-jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      id: "admin-payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: Wallet,
    },
    {
      id: "admin-settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
};

const roleLabels: Record<DashboardRole, string> = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  admin: "Administrator",
};

// Only the most specific menu entry gets highlighted. Without this, a nested
// page such as /jobs/new would also light up its parent "Manage Jobs" item.
const getActiveUrl = (pathname: string, items: DashboardMenuItem[]) =>
  items
    .filter(
      (item) => pathname === item.url || pathname.startsWith(`${item.url}/`),
    )
    .sort((a, b) => b.url.length - a.url.length)[0]?.url;

// Each dashboard section owns its own menu, matching the three sidebar states
// in Figma. The section comes from the URL, and the signed-in role is the
// fallback for any dashboard page that is not role-specific.
const dashboardSections: DashboardRole[] = ["seeker", "recruiter", "admin"];

const getDashboardRole = (
  pathname: string,
  role: DashboardRole,
): DashboardRole => {
  const section = pathname.split("/")[2];

  return dashboardSections.find((candidate) => candidate === section) ?? role;
};

const getInitials = (name?: string) => {
  const source = name?.trim() || "HireLoop";
  const parts = source.split(/\s+/).filter(Boolean);

  return (
    parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : source.slice(0, 2)
  ).toUpperCase();
};

const navItemClasses =
  "relative h-[34px] gap-2.5 rounded-md px-2.5 py-0 text-[13px] font-medium text-[#a1a4aa] transition-colors hover:bg-[#1b1b1e] hover:text-[#f4f4f5] data-active:bg-[#232327] data-active:text-[#f4f4f5] data-active:shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)] [&_svg]:size-[18px] [&_svg]:shrink-0";

type DashboardSidebarProps = {
  user: {
    name: string;
    email: string;
    role: DashboardRole;
  };
};

const DashboardSidebar = ({ user }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();
  const [signingOut, setSigningOut] = useState(false);

  const menuRole = getDashboardRole(pathname, user.role);
  const activeUrl = getActiveUrl(pathname, menuItemsByRole[menuRole]);

  // Keep the mobile sheet from staying open after a navigation.
  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false);
  };

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (cause) {
      console.error("[hireloop:sidebar] sign out failed", cause);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="gap-0 px-3 pt-5 pb-5">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="flex h-8 w-fit items-center rounded-md focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
        >
          <Image
            src="/asset/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarMenu className="gap-0.5">
          {menuItemsByRole[menuRole].map((item) => {
            const active = item.url === activeUrl;

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  render={
                    <Link
                      href={item.url}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMobileSidebar}
                    />
                  }
                  isActive={active}
                  className={navItemClasses}
                >
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-brand"
                    />
                  ) : null}
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="gap-3 px-3 pt-3 pb-4">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.07] bg-[#141416] p-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[11px] font-semibold text-[#9b95ff] ring-1 ring-brand/25 ring-inset">
            {getInitials(user.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-[#f4f4f5]">
              {user.name}
            </p>
            <p className="truncate text-xs text-[#7c7f87]">
              {roleLabels[user.role]}
            </p>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              disabled={signingOut}
              className={cn(navItemClasses, "cursor-pointer disabled:opacity-60")}
            >
              <LogOut />
              <span>{signingOut ? "Signing out..." : "Logout"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
