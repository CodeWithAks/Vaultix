import { useState } from "react";
import { createTransaction } from "../../api/transaction.api";

export default function QuickTransfer() {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState(""); 
    const [loading, setLoading] = useState(false);

    const handleTransfer = async () => {
        try{
            setLoading(true);
            const data = await createTransaction({
                toAccount: recipient,
                amount: Number(amount),
                idempotencyKey: crypto.randomUUID()
            })
            console.log("Transaction successful:", data);
        } catch (error) {
            console.error("Transaction failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 mt-8">

            {/* Heading */}
            <h2 className="text-2xl font-semibold mb-6">
                Quick Transfer
            </h2>

            {/* Recipient Input */}
            <div className="mb-4">

                <label className="block text-sm text-zinc-400 mb-2">
                    Recipient
                </label>

                <input
                    type="text"
                    placeholder="Enter recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
                />

            </div>

            {/* Amount Input */}
            <div className="mb-6">
                <label className="block text-sm text-zinc-400 mb-2">
                    Amount
                </label>

                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
                />
            </div>

            {/* Transfer Button */}
            <button onClick={handleTransfer} disabled={loading}
                className="w-full bg-cyan-400 text-black font-semibold py-3 rounded-xl hover:bg-cyan-300 transition"
            >
                {loading ? "Processing..." : "Transfer"}
            </button>
        </div>
    );
}