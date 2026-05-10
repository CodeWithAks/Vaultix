import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  LineChart,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-cyan-400 mb-12">
        Vaultix
      </h1>

      {/* Navigation */}
      <div className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/cards"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 transition"
        >
          <CreditCard size={20} />
          Cards
        </Link>

        <Link
          to="/transfers"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 transition"
        >
          <ArrowLeftRight size={20} />
          Transfers
        </Link>

        <Link
          to="/insights"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 transition"
        >
          <LineChart size={20} />
          Insights
        </Link>

      </div>

      {/* Logout */}
      <div className="mt-20">

        <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition w-full">
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}