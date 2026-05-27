import React from 'react'
import DashboardLayout from "../components/layout/DashboardLayout";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchStats } from "../store/slices/statsSlice";
import { fetchMonthlyAnalytics } from "../store/slices/analyticsSlice";

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

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
];


export default function Insights() {
  const dispatch = useDispatch();

  const stats = useSelector((state) => state.stats);
  const { data } = useSelector((state) => state.analytics);

  const pieData = [
    {
      name: "Income",
      value: stats?.income || 0,
    },
    {
      name: "Expenses",
      value: stats?.expenses || 0,
    },
    {
      name: "Savings",
      value: stats?.savings || 0,
    },
  ];

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchMonthlyAnalytics());
  }, [dispatch]);

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
            ₹{stats?.savings || 0}
          </h2>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
          <p className="text-zinc-400 text-sm">
            Monthly Spending
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{stats?.expenses || 0}
          </h2>
        </div>


        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400 text-sm">
            Total Income
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{stats?.income || 0}
          </h2>

        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Pie Chart */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Financial Distribution
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >

                  {pieData.map((entry, index) => (
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
            Monthly Spending Analytics
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

                <XAxis dataKey="month" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="spending"
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