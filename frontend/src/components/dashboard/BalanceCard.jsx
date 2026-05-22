import { Send, Plus } from "lucide-react";
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBalance } from "../../store/slices/accountSlice";


export default function BalanceCard() {

  const dispatch = useDispatch();
  const { balance, loading, error } = useSelector(
    (state) => state.account
  )

  console.log("BALANCE FROM REDUX:", balance);
  console.log("FULL ACCOUNT STATE:", { balance, loading, error });

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  if (loading) {
    return <p className="text-white">Loading....</p>
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 shadow-2xl">

      {/* Top Section */}
      <div className="flex justify-between items-start">

        <div>
          <p className="text-sm text-white/80">
            Total Balance
          </p>

          <h1 className="text-5xl font-bold mt-2">
            ${Number(balance || 0).toFixed(2)}
          </h1>
        </div>

        <div className="bg-white/20 px-4 py-2 rounded-xl text-sm">
          VISA
        </div>

      </div>

      {/* Card Details */}
      <div className="mt-10 flex justify-between items-center">

        <div>
          <p className="text-sm text-white/70">
            Card Number
          </p>

          <p className="text-lg tracking-widest mt-1">
            •••• •••• •••• 4829
          </p>
        </div>

        <div>
          <p className="text-sm text-white/70">
            Expires
          </p>

          <p className="text-lg mt-1">
            12/26
          </p>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-10">

        <button className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl font-medium hover:scale-105 transition">

          <Send size={18} />

          Send

        </button>

        <button className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-xl hover:bg-white/30 transition">

          <Plus size={18} />

          Add

        </button>

      </div>

    </div>
  );
}