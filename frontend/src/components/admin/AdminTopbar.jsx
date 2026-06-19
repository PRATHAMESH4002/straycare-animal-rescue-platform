import React from "react";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

const AdminTopbar = ({ onMenuClick }) => {
  return (
    <div className="w-full bg-white shadow p-4 flex items-center justify-between 
      fixed md:static top-0 left-0 right-0 z-40">

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2"
        onClick={onMenuClick}
      >
        <Menu size={26} />
      </button>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-green-700">
        Admin Panel
      </h2>

      {/* Clerk User Icon (Logout Dropdown) */}
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
      </div>

    </div>
  );
};

export default AdminTopbar;
