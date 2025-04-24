// import { useState } from "react";
import {
  BarChart3,
  DollarSign,
  Home,
  MessageSquare,
  Settings,
  ShoppingBag,
  Upload,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
// import { href } from "react-router-dom";

// Menu items.
const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/idashboard",
    icon: Home,
  },
  {
    title: "Campaign Requests",
    href: "/campaign-requests",
    icon: ShoppingBag,
  },
  {
    title: "Status Tracker",
    href: "/status-tracker",
    icon: Upload,
  },
  {
    title: "Earnings",
    href: "/earnings",
    icon: DollarSign,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Profile Stats",
    href: "/profile-stats",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  //   const [activeItem, setActiveItem] = useState<string>("Dashboard");
  //   const pathname = usePathname();
  const location = useLocation();
  return (
    <Sidebar className="hidden border-r bg-background md:block md:w-64">
      <SidebarContent className="flex h-full flex-col gap-2 p-4">
        <SidebarGroup>
          <SidebarGroupLabel>
            <User className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">Influencer</span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="grid gap-1 px-2 pt-4">
              {sidebarLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      location.pathname === item.title
                        ? "bg-secondary"
                        : "bg-ghost"
                    }`}
                  >
                    <Link to={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
