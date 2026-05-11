import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-black text-white min-h-screen">

      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 p-4 md:p-8">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        {children}
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-zinc-950 border-r border-zinc-800 p-6 shadow-2xl">
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
}