import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../../store/slices/transactionSlice";


export default function Transactions() {

  const dispatch = useDispatch();
  const { transactions, currentAccount, loading, error } = useSelector(
    (state) => state.transactions
  ); //store se data liya
  
  //fetch transactions 
  useEffect(() => {
  dispatch(fetchTransactions());
}, [dispatch]);

  if(loading) {
    return <p className="text-white">Loading...</p>
  }

  if(error) {
    return <p className="text-red-500">Error: {error}</p>
  }

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

        {transactions.length === 0 ? (

    <div className="bg-zinc-900 rounded-2xl p-10 text-center border border-zinc-800">
      <h3 className="text-xl font-semibold text-zinc-300">
        No Transactions Yet
      </h3>

      <p className="text-zinc-500 mt-2">
        Your recent transactions will appear here.
      </p>
    </div>

  ) : (

        transactions.map((transaction) => {

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
                  className={`font-semibold ${isSender
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

        })
      )}

      </div>

    </div>
  );
}