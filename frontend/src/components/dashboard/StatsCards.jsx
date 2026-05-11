import {
  ArrowDownCircle,
  ArrowUpCircle,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

const stats = [               //4 cards dummy data(store in array of objects) 
  {
    title: "Income",
    amount: "+$8,420",
    icon: ArrowDownCircle,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    title: "Expenses",
    amount: "-$3,280",
    icon: ArrowUpCircle,
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    title: "Savings",
    amount: "$12,500",
    icon: PiggyBank,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    title: "Investments",
    amount: "+18%",
    icon: TrendingUp,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
];

export default function StatsCards() {
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