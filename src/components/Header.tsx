import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Influencer", path: "/Influencer" },
  { name: "Business", path: "/Business" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showMenu = () => setIsMenuOpen(true);
  const hideMenu = () => setIsMenuOpen(false);

  return (
    // <header className="sticky top-0  z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <header className=" p-4 shadow-md fixed top-0 left-0 w-full right-0 z-11 border-b border-gray-200 sticky  bg-background/95 ">
      <div className="container flex justify-between items-center mx-auto px-4 py-2">
        <h1 className="text-xl text-green-500">WhatsAd</h1>
        <nav>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                className="mx-2 text-green-500 hover:text-green-600"
                href={item.path}
              >
                {item.name}
              </a>
            ))}
          </div>
          <button className="md:hidden" onClick={() => showMenu()}>
            <Menu size={20} />
          </button>
        </nav>
      </div>
      <div
        className={`  fixed top-0 right-0 h-full  bg-gray-300 transition-transform duration-2000 ease-in-out transform ${
          isMenuOpen ? "translate-x-0 w-30" : "translate-x-full"
        } md:hidden`}
      >
        <ul className="flex flex-col items-start p-4 space-y-4">
          <X size={24} onClick={hideMenu} />
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className="block text-zink-950 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
export default Header;
