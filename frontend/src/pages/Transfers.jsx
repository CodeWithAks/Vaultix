import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

const contacts = [
  {
    name: "Sarah",
    initials: "SJ",
  },
  {
    name: "Mike",
    initials: "MC",
  },
  {
    name: "Emma",
    initials: "ED",
  },
  {
    name: "Alex",
    initials: "AW",
  },
];

export default function Transfers() {
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
              placeholder="Enter recipient"
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
              placeholder="$0.00"
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
              rows="4"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none resize-none"
            />

          </div>

          {/* Button */}
          <button className="w-full bg-cyan-400 text-black font-semibold py-4 rounded-2xl hover:bg-cyan-300 transition-all">

            Send Money

          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Recent Contacts
          </h2>

          <div className="flex flex-col gap-4">

            {contacts.map((contact, index) => (

              <div
                key={index} 
                className="flex items-center gap-4 bg-zinc-900 rounded-2xl p-4 hover:bg-zinc-800 transition"
              >

                <div className="bg-cyan-400 text-black h-12 w-12 rounded-full flex items-center justify-center font-bold">
                  {contact.initials}
                </div>

                <div>
                  <h3 className="font-medium">
                    {contact.name}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    Recent transfer
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