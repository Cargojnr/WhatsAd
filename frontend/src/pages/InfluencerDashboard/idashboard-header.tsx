import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
function IdashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      {/* <SidebarTrigger className="-ml-1" /> */}

      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />

          {/* <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">WhasAd</span>
          </Link> */}
          <span className="text-xl font-bold text-green-600">WhasAd</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard/notifications">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>

              {/* <DropdownMenuItem asChild>
                <Link to="/profile-stats">Profile</Link>
              </DropdownMenuItem> */}
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
export default IdashboardHeader;
