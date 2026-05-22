import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMonthlyAnalytics } from "../../store/slices/analyticsSlice";

// const data = [
//   { month: "Jan", spending: 400 },   //one bar for each month
//   { month: "Feb", spending: 700 },
//   { month: "Mar", spending: 500 },
//   { month: "Apr", spending: 900 },
//   { month: "May", spending: 650 },
//   { month: "Jun", spending: 850 },
// ];

export default function Analytics() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.analytics); //analytics slice se data, loading, error le rhe h
  console.log("ANALYTICS DATA:", data);

  useEffect(() => {
    dispatch(fetchMonthlyAnalytics()); //jab component mount hoga tab monthly spending fetch krne ke liye action dispatch hoga
  }, [dispatch]);


  console.log("FINAL DATA:", data);

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
      <div className="h-80">


        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data || []}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Bar dataKey="spending" fill="#22d3ee" />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}