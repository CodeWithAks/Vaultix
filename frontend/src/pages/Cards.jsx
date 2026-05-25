import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Lock, Wifi } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../store/slices/cardSlice";

// const cards = [
//   {
//     type: "Visa",
//     number: "**** 4829",
//     balance: "$12,540",
//     color: "from-cyan-500 to-blue-600",
//   },
//   {
//     type: "Mastercard",
//     number: "**** 1934",
//     balance: "$8,200",
//     color: "from-purple-500 to-pink-500",
//   },
// ];

export default function Cards() {
  const dispatch = useDispatch();

  const {cards,loading,error}  = useSelector((state) => state.cards);

  useEffect(()=> {
    dispatch(fetchCards());
  },[dispatch]);

  if (loading) {
  return (
    <DashboardLayout>
      <p className="text-white">Loading cards...</p>
    </DashboardLayout>
  );
}

if (error) {
  return (
    <DashboardLayout>
      <p className="text-red-500">Error: {error}</p>
    </DashboardLayout>
  );
}

  const getCardColor = (type) => {
  switch (type) {
    case "VISA":
      return "from-cyan-500 to-blue-600";

    case "MASTERCARD":
      return "from-purple-500 to-pink-500";

    default:
      return "from-gray-500 to-gray-700";
  }
};
  

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          My Cards
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your payment cards
        </p>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {cards.map((card, index) => (

          <div
            key={index}
            className={`bg-gradient-to-br ${getCardColor(card.cardType)} rounded-[32px] p-8 min-h-[240px] relative overflow-hidden shadow-2xl`}
          >

            {/* Top */}
            <div className="flex justify-between items-center">

              <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md">
                {card.cardType}
              </div>  

              <Wifi className="rotate-90" />

            </div>

            {/* Middle */}
            <div className="mt-16">

              <p className="text-white/70 text-sm">
                Card Number
              </p>

              <h2 className="text-3xl font-bold tracking-widest mt-2">
                {card.cardNumber}
              </h2>

            </div>

            {/* Bottom */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">

              <div>

                <p className="text-white/70 text-sm">
                  Balance
                </p>

                <h3 className="text-2xl font-bold mt-1">
                 ₹{card.balance}
                </h3>

              </div>

              <Lock size={20} />

            </div>

            {/* Decorative Blur */}
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-white/10 rounded-full blur-3xl" />

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}