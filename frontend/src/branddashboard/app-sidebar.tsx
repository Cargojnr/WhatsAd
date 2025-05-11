// import { useState } from "react";
import {
  BarChart3,
  Building,
  DollarSign,
  Home,
  Settings,
  UserPlus,
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

// Menu items.
const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/bdashboard",
    icon: Home,
  },
  {
    title: "Campaigns",
    href: "/campaings",
    icon: Building,
  },
  {
    title: "Find Influencers",
    href: "/influencers",
    icon: UserPlus,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },

  {
    title: "Payments",
    href: "/payments",
    icon: DollarSign,
  },
  {
    title: "Settings",
    href: "/brandsettings",
    icon: Settings,
  },
];

export function BrandSidebar() {
  //   const [activeItem, setActiveItem] = useState<string>("Dashboard");
  //   const pathname = usePathname();
  const location = useLocation();
  return (
    <Sidebar className="hidden border-r bg-background md:block md:w-64">
      <SidebarContent className="flex h-full flex-col gap-2 p-4">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Building className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">Brand Portal</span>
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
