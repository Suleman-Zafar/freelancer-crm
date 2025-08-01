import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Plus } from "lucide-react";

const Header = ({ title = "Clients" }) => {
  return (
    <header className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

      {/* Actions: Search + Button */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-56 text-sm bg-white border border-gray-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={16} />
          Add
        </Button>
      </div>
    </header>
  );
};

export default Header;
