import { ArrowDownCircle, ArrowUpCircle, PiggyBank, TrendingUp, } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../store/slices/statsSlice"


export default function StatsCards() {

  const dispatch = useDispatch();

  const { income, expenses, savings, loading, error } = useSelector(
    (state) => state.stats
  );

  useEffect(() => {
    dispatch(fetchStats()); //api call 
  }, [dispatch]);

  const stats = [
    {
      title: "Income",
      amount: `+₹${income}`,
      icon: ArrowDownCircle,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      title: "Expenses",
      amount: `-₹${expenses}`,  
      icon: ArrowUpCircle,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
    {
      title: "Savings",
      amount: `₹${savings}`,    
      icon: PiggyBank,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    }
  ]

  if (loading) {
    return <p className="text-white">Loading....</p>
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 hover:border-cyan-400/30 transition-all duration-300"
          >

            {/* TOP */}
            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-400 text-sm">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {item.amount}
                </h2>
              </div>

              <div
                className={`${item.bg} ${item.color} p-3 rounded-2xl`}
              >
                <Icon size={22} />
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}