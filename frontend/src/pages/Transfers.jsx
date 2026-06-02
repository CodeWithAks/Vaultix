import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { createTransaction } from "../api/transaction.api";
import { toast } from "react-toastify";
import { fetchBalance } from "../store/slices/accountSlice";
import { fetchTransactions } from "../store/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import api from "../api/axios";

export default function Transfers() {
  const dispatch = useDispatch();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  //searching
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {

    const delay = setTimeout(async () => {

      if (search.length < 2) {
        setUsers([]);
        return;
      }

      try {

        const res = await api.get(
          `/users/search?query=${search}`
        );

        setUsers(res.data);

      } catch (err) {

        console.log(err);

      }

    }, 300);

    return () => clearTimeout(delay);

  }, [search]);

  const { transactions } = useSelector((state) => state.transactions);

  //recent contacts
  const recentContacts =
    transactions
      ?.filter(
        (tx) =>
          tx.fromAccount?.user?.email !== "vaultix@system.com" &&
          tx.toAccount?.user
      )
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

    if (!selectedUser) {
      toast.error("Please select a user");
      return;
    }

    try {
      setLoading(true);

      await createTransaction({
        toAccount: selectedUser.email,
        amount: Number(amount),
        note,
        idempotencyKey: crypto.randomUUID(),
      });

      dispatch(fetchBalance());
      dispatch(fetchTransactions());

      toast.success("Money sent successfully!");

      setSearch("");
      setSelectedUser(null);
      setAmount("");
      setNote("");
      setUsers([]);

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
              value={search}
              placeholder="Search user by name/email"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
            />

            {users.length > 0 && (

              <div className="bg-zinc-900 border border-zinc-700 rounded-xl mt-2 overflow-hidden">

                {users.map((u) => (

                  <div
                    key={u.email}
                    onClick={() => {

                      setSelectedUser(u);

                      setSearch(
                        `${u.name} (${u.email})`
                      );

                      setUsers([]);

                    }}
                    className="p-3 hover:bg-zinc-800 cursor-pointer transition"
                  >
                    <p className="text-white font-medium">
                      {u.name}
                    </p>

                    <p className="text-zinc-400 text-sm">
                      {u.email}
                    </p>
                  </div>

                ))}

              </div>

            )}

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

            {uniqueContacts.length === 0 ? (

              <div className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800">

                <h3 className="text-zinc-300 font-medium">
                  No recent contacts yet
                </h3>

                <p className="text-zinc-500 text-sm mt-2">
                  Transfer money to start building your contact list.
                </p>

              </div>

            ) : (

              uniqueContacts.map((contact, index) => (

                <div
                  key={index}
                  onClick={() => {
                    setSelectedUser(contact);
                    setSearch(
                      `${contact.name} (${contact.email})`
                    );
                  }}
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

              ))
            )}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}