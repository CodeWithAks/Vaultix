import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid, } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMonthlyAnalytics } from "../../store/slices/analyticsSlice";


export default function Analytics() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.analytics); //analytics slice se data, loading, error le rhe h
  console.log("ANALYTICS DATA:", data);

  useEffect(() => {
    dispatch(fetchMonthlyAnalytics()); //jab component mount hoga tab monthly spending fetch krne ke liye action dispatch hoga
  }, [dispatch]);

  //all months
  const fullMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  //fill missing months with 0 
  const normalizedData = fullMonths.map((m) => {
    const found  = data?.find((d) => d.month === m);

    return {
      month:m,
      spending:found?found.spending:0,
    }
  });

  console.log("NORMALIZED DATA:", normalizedData);

  if (loading) {
    return <p className="text-white">Loading....</p>
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }



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
      <div className="h-80 w-full">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={normalizedData}>

            {/* grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
            />

            {/* x-axis */}
            <XAxis
              dataKey="month"
              stroke="#a1a1aa"
            />

            {/* tooltip */}
            <Tooltip />

            {/* bars */}
            <Bar
              dataKey="spending"
              fill="#22d3ee"
              barSize={22}
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>
    </div>
  );
}