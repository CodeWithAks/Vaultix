import { Bell, Search, Menu } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function TopNavbar({ onMenuClick }) {

  const user = useSelector((state) => state.auth.user);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    else if (hour < 18) return "Good afternoon";
    else return "Good evening";
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

      {/* LEFT */}
      <div className="flex items-center justify-between gap-4 w-full sm:w-auto">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-400 mt-1">{greeting()},  {user?.name || "User"} 👋</p>
        </div>

        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden bg-zinc-900 border border-zinc-800 p-3 rounded-2xl hover:bg-zinc-800 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 w-full sm:w-auto">

        {/* Search */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2 w-full sm:w-72">

          <Search size={18} className="text-zinc-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 w-full"
          />

        </div>

        {/* Notification */}
        <button className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl hover:bg-zinc-800 transition">

          <Bell size={20} />

        </button>

      </div>

    </div>
  );
}