import React from "react";
import { Button } from "../ui/button";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t py-4 px-4 mt-auto">
      <div className="flex justify-between items-center flex-wrap gap-4 text-sm text-gray-500">
        <p>Number: --</p>

        <div className="flex items-center space-x-2">
          
        </div>

        <p className="text-right w-full md:w-auto mt-2 md:mt-0">
          &copy; {year} YourCompany. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
