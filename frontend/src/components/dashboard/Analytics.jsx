import {ResponsiveContainer,BarChart,Bar,XAxis,Tooltip,} from "recharts";

const data = [
  { month: "Jan", spending: 400 },   //one bar for each month
  { month: "Feb", spending: 700 },
  { month: "Mar", spending: 500 },
  { month: "Apr", spending: 900 },
  { month: "May", spending: 650 },
  { month: "Jun", spending: 850 },
];

export default function Analytics() {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 mt-8">

      {/* Header */}
      <div className="mb-6">

        <h2 className="text-2xl font-semibold">
          Spending Overview
        </h2>

        <p className="text-zinc-400 mt-1">
          Your spending pattern over 6 months
        </p>

      </div>

      {/* Chart */}
      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <XAxis dataKey="month" />

            <Tooltip />

            <Bar
              dataKey="spending"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}