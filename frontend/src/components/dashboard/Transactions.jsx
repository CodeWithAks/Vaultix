import React from 'react'

const transactions = [
  {
    id: 1,
    name: "Netflix",
    date: "Today",
    amount: "-$15.99",
    status: "Completed",
  },
  {
    id: 2,
    name: "Salary",
    date: "Yesterday",
    amount: "+$3200",
    status: "Completed",
  },
  {
    id: 3,
    name: "Amazon",
    date: "2 May",
    amount: "-$120.50",
    status: "Completed",
  },
  {
    id: 4,
    name: "Spotify",
    date: "1 May",
    amount: "-$9.99",
    status: "Completed",
  },
];

export default function Transactions() {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 mt-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-semibold">
          Recent Transactions
        </h2>

        <button className="text-cyan-400 hover:text-cyan-300 transition">
          View All
        </button>

      </div>

      {/* Transactions List */}
      <div className="flex flex-col gap-4">

        {transactions.map((transaction) => (

          <div
            key={transaction.id}
            className="flex justify-between items-center bg-zinc-900 rounded-2xl p-4 hover:bg-zinc-800 transition"
          >

            {/* Left */}
            <div>

              <h3 className="font-medium">
                {transaction.name}
              </h3>

              <p className="text-sm text-zinc-400">
                {transaction.date}
              </p>

            </div>

            {/* Right */}
            <div className="text-right">

              <p className="font-semibold">
                {transaction.amount}
              </p>

              <p className="text-sm text-green-400">
                {transaction.status}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}