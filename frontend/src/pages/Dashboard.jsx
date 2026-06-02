import DashboardLayout from "../components/layout/DashboardLayout";
import BalanceCard from "../components/dashboard/BalanceCard";
import Analytics from "../components/dashboard/Analytics";
import QuickTransfer from "../components/dashboard/QuickTransfer";
import Transactions from "../components/dashboard/Transactions";
import StatsCards from "../components/dashboard/StatsCards";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {

  useEffect(() => {

    const shouldShowBonus =
      sessionStorage.getItem(
        "welcomeBonusToast"
      );

    if (shouldShowBonus) {

      toast.success(
        "🎉 ₹10,000 Welcome Bonus Added!"
      );

      sessionStorage.removeItem(
        "welcomeBonusToast"
      );
    }

  }, []);

  return (
    <DashboardLayout>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2">

          <BalanceCard />

          <StatsCards />

        </div>

        {/* RIGHT SIDE */}
        <div>

          <QuickTransfer />

        </div>

      </div>

      {/* Analytics */}
      <Analytics />

      {/* Transactions */}
      <Transactions />

    </DashboardLayout>
  );
}