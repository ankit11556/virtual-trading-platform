import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Market", path: "/market" },
    { name: "Trade", path: "/trade" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "History", path: "/history" },
    { name: "Analytics", path: "/analytics" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white  shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            VirtualTrade 
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-yellow-300 transition duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 text-white px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block hover:text-yellow-300 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
