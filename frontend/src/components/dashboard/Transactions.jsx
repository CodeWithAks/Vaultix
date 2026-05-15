import React, { useEffect, useState } from 'react'
import { getTransactions } from '../../api/transaction.api';

export default function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    const getTransactionsData = async () => {
      try {
        const data = await getTransactions(); //fetching transactions data from backend
        setTransactions(data.transactions); //setting the fetched data to state
        console.log("Fetched transactions:", data.transactions);
        setCurrentAccount(data.currentAccount); //setting current account data to state
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    getTransactionsData();
  }, []);

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

        {transactions.map((transaction) => {

  const isSender =
    transaction?.fromAccount?._id?.toString() ===
    currentAccount?.toString();

  return (

    <div
      key={transaction._id}
      className="flex justify-between items-center bg-zinc-900 rounded-2xl p-4 hover:bg-zinc-800 transition"
    >

      {/* Left */}
      <div>

        <h3 className="font-medium">
          {isSender
            ? `To: ${transaction?.toAccount?.user?.name}`
            : `From: ${transaction?.fromAccount?.user?.name}`}
        </h3>

        <p className="text-sm text-zinc-400">
          {new Date(transaction.createdAt).toLocaleDateString()}
        </p>

      </div>

      {/* Right */}
      <div className="text-right">

        <p
          className={`font-semibold ${
            isSender
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {isSender ? "-" : "+"}${transaction.amount}
        </p>

        <p className="text-sm text-green-400">
          {transaction.status}
        </p>

      </div>

    </div>

  );

})}

      </div>

    </div>
  );
}