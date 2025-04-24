import { useState } from "react";

import * as React from "react";
import { cn } from "@/lib/utils";
// import ListItem from "./Listitem";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// const navItems = [
//   // { name: "Home", path: "/" },
//   { name: "Influencer", path: "/Influencer" },
//   { name: "Brand", path: "/Brand" },
//   { name: "Business", path: "/Business" },
// ];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showMenu = () => setIsMenuOpen(true);
  const hideMenu = () => setIsMenuOpen(false);

  return (
    // <header className=" p-3 sticky z-50  w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block hidden">
    // <header className=" p-4 shadow-md fixed top-0 left-0 w-full right-0 z-11 border-b border-gray-200 sticky  bg-background/95 ">
    <header className="  sticky top-0  z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 py-2 ">
        <a href="/" className="flex items-center ">
          <img src="/img/logo.png" alt="Logo" className="h-25 w-auto" />
        </a>
        <div className="hidden md:flex space-x-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Brands</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Launch Your Campaign
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Connect with WhatsApp influencers and reach millions
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/brands" title="Campaign Management">
                      Track and optimize your influencer campaigns
                    </ListItem>
                    <ListItem href="/analytics" title="Analytics">
                      Real-time insights and performance metrics
                    </ListItem>
                    <ListItem href="/case-studies" title="Case Studies">
                      Success stories from leading brands
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Influencers</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/influencers" title="Monetize Your Status">
                      Turn your WhatsApp Status into income
                    </ListItem>
                    <ListItem href="/campaigns" title="Find Campaigns">
                      Browse and apply to brand campaigns
                    </ListItem>
                    <ListItem href="/payments" title="Easy Payments">
                      Secure and fast payment processing
                    </ListItem>
                    <ListItem href="/growth" title="Grow Your Audience">
                      Tips and tools to increase your reach
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/Business">
                  <NavigationMenuLink className="">Business</NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem className="ml-4">
                <a href="/dasboard">
                  <NavigationMenuLink className="">
                    Dashboards
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="  md:flex flex gap-4">
          <Link to="/login">
            {" "}
            <Button variant="ghost">Log In</Button>
          </Link>
          {/* <Link to="/signup"> <Button>Sign Up</Button></Link> */}
          <Dialog>
            <DialogTrigger>
              <Button>Sign Up</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">Sign up</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col gap-3 min-[400px]:flex-row text-center justify-center items-center mt-5">
                    <Link to="/bsignup?role=brand">
                      {" "}
                      <Button
                        size="lg"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        I am a Brand
                      </Button>
                    </Link>
                    <Link to="/isignup?role=influencer">
                      {" "}
                      <Button size="lg" variant="outline">
                        I am an Influencer
                      </Button>
                    </Link>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div className="md:hidden flex items-center">
          <Button variant="ghost" onClick={isMenuOpen ? hideMenu : showMenu}>
            {isMenuOpen ? <X size={48} /> : <Menu size={48} />}
          </Button>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }  transition-all duration-1000 ease-in-out md:hidden`}
      >
        <div className="flex-col  space-y-4 p-4 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList className=" ">
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Brands</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Launch Your Campaign
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Connect with WhatsApp influencers and reach millions
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/brands" title="Campaign Management">
                      Track and optimize your influencer campaigns
                    </ListItem>
                    <ListItem href="/analytics" title="Analytics">
                      Real-time insights and performance metrics
                    </ListItem>
                    <ListItem href="/case-studies" title="Case Studies">
                      Success stories from leading brands
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Influencers</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4">
                    <ListItem href="/influencers" title="Monetize Your Status">
                      Turn your WhatsApp Status into income
                    </ListItem>
                    <ListItem href="/campaigns" title="Find Campaigns">
                      Browse and apply to brand campaigns
                    </ListItem>
                    <ListItem href="/payments" title="Easy Payments">
                      Secure and fast payment processing
                    </ListItem>
                    <ListItem href="/growth" title="Grow Your Audience">
                      Tips and tools to increase your reach
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/Business">
                  <NavigationMenuLink className="">Business</NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/dasboard">
                  <NavigationMenuLink className="">
                    Dashboards
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
export default Header;
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
