import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-2xl font-bold">
            Bank Dashboard
          </h1>

          <input
            type="text"
            placeholder="Search..."
            className="bg-zinc-900 px-4 py-2 rounded-lg outline-none"
          />

        </div>

        {/* Dynamic Page Content */}
        {children}

      </div>

    </div>
  );
}