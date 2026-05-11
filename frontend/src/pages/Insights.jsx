import React from 'react'
import DashboardLayout from "../components/layout/DashboardLayout";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
} from "recharts";

const spendingData = [
  { name: "Food", value: 400 },
  { name: "Shopping", value: 300 },
  { name: "Bills", value: 200 },
  { name: "Entertainment", value: 150 },
];

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

const incomeData = [
  { month: "Jan", income: 2400 },
  { month: "Feb", income: 1398 },
  { month: "Mar", income: 9800 },
  { month: "Apr", income: 3908 },
  { month: "May", income: 4800 },
  { month: "Jun", income: 3800 },
];

export default function Insights() {
  return (
    <DashboardLayout>

      {/* Heading */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Financial Insights
        </h1>

        <p className="text-zinc-400 mt-2">
          Track your financial activity
        </p>

      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
          <p className="text-zinc-400 text-sm">
            Total Savings
          </p>

          <h2 className="text-3xl font-bold mt-2">
            $24,500
          </h2>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
          <p className="text-zinc-400 text-sm">
            Monthly Spending
          </p>

          <h2 className="text-3xl font-bold mt-2">
            $3,280
          </h2>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
          <p className="text-zinc-400 text-sm">
            Investments
          </p>

          <h2 className="text-3xl font-bold mt-2">
            +18%
          </h2>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
          <p className="text-zinc-400 text-sm">
            Cashback Earned
          </p>

          <h2 className="text-3xl font-bold mt-2">
            $420
          </h2>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Pie Chart */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Spending Categories
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={spendingData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                >

                  {spendingData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Line Chart */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Income Growth
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={incomeData}>

                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

                <XAxis dataKey="month" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#06b6d4"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}