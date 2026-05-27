import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { createTransaction } from "../api/transaction.api";
import { toast } from "react-toastify";
import { fetchBalance } from "../store/slices/accountSlice";
import { fetchTransactions } from "../store/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Transfers() {
  const dispatch = useDispatch();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const { transactions } = useSelector((state) => state.transactions);

  //recent contacts
  const recentContacts =
    transactions
      ?.filter((tx) => tx.toAccount?.user)
      ?.map((tx) => ({
        name: tx.toAccount.user.name,
        email: tx.toAccount.user.email,
      })) || [];

  const uniqueContacts = [
    ...new Map(
      recentContacts.map((contact) => [
        contact.email,
        contact,
      ])
    ).values(),
  ];

  const handleSendMoney = async () => {
    try {
      setLoading(true);

      await createTransaction({
        toAccount: recipient,
        amount,
        note,
        idempotencyKey: crypto.randomUUID(),
      });

      dispatch(fetchBalance());
      dispatch(fetchTransactions());

      toast.success("Money sent successfully!");

      setRecipient("");
      setAmount("");
      setNote("");

    } catch (err) {
      console.log(err);
      toast.error(
      err?.response?.data?.message ||
      "Transaction failed"
    );
    } finally {
      setLoading(false);
    }
  };


  return (
    <DashboardLayout>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-3xl p-8">

          <h1 className="text-3xl font-bold mb-2">
            Send Money
          </h1>

          <p className="text-zinc-400 mb-8">
            Transfer funds securely
          </p>

          {/* Recipient */}
          <div className="mb-5">

            <label className="block text-sm text-zinc-400 mb-2">
              Recipient
            </label>

            <input
              type="text"
              value={recipient}
              placeholder="Enter recipient email"
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
            />

          </div>

          {/* Amount */}
          <div className="mb-5">

            <label className="block text-sm text-zinc-400 mb-2">
              Amount
            </label>

            <input
              type="number"
              value={amount}
              placeholder="$0.00"
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
            />

          </div>

          {/* Note */}
          <div className="mb-8">

            <label className="block text-sm text-zinc-400 mb-2">
              Note
            </label>

            <textarea
              placeholder="Add note..."
              value={note}
              rows="4"
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none resize-none"
            />

          </div>

          {/* Button */}
          {/* <button className="w-full bg-cyan-400 text-black font-semibold py-4 rounded-2xl hover:bg-cyan-300 transition-all">

            Send Money

          </button> */}
          <button
            className="w-full bg-cyan-400 text-black font-semibold py-4 rounded-2xl hover:bg-cyan-300 transition-all"
            onClick={handleSendMoney}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Money"}
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Recent Contacts
          </h2>

          <div className="flex flex-col gap-4">

            {uniqueContacts.map((contact, index) => (

              <div
                key={index}
                onClick={() => setRecipient(contact.email)}
                className="flex items-center gap-4 bg-zinc-900 rounded-2xl p-4 hover:bg-zinc-800 transition cursor-pointer"
              >

                <div className="bg-cyan-400 text-black h-12 w-12 rounded-full flex items-center justify-center font-bold">

                  {contact.name.slice(0, 2).toUpperCase()}

                </div>

                <div>

                  <h3 className="font-medium">
                    {contact.name}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    {contact.email}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}