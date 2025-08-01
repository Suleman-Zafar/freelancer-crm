import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // install lucide-react for icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Clients", path: "/clients" },
    { name: "Projects", path: "/projects" },
    { name: "Invoices", path: "/invoices" },
    { name: "Income", path: "/income" },
    {name: "Dashboard", path: "/dashboard" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-indigo-500 font-extrabold text-xl">
            CRMfreelance
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive(item.path)
                    ? "text-indigo-500 font-semibold"
                    : "text-gray-900 hover:text-indigo-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 text-sm">
              Logout
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                isActive(item.path)
                  ? "text-indigo-500 font-semibold"
                  : "text-gray-900 hover:text-indigo-500"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              // handle logout
            }}
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
