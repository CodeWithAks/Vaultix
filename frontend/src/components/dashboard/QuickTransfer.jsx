import { useDispatch } from "react-redux";
import { fetchBalance } from "../../store/slices/accountSlice";
import { fetchTransactions } from "../../store/slices/transactionSlice";
import { fetchMonthlyAnalytics } from "../../store/slices/analyticsSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { createTransaction } from "../../api/transaction.api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function QuickTransfer() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { transactions, currentAccount } = useSelector((state) => state.transactions);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const recentContacts =
        transactions?.flatMap((tx) => {
            const contacts = [];

            if (
                tx?.fromAccount?.user &&
                tx.fromAccount.user.name !== "Vaultix"
            ) {
                contacts.push(tx.fromAccount.user);
            }

            if (
                tx?.toAccount?.user &&
                tx.toAccount.user.name !== "Vaultix"
            ) {
                contacts.push(tx.toAccount.user);
            }

            return contacts;
        }) || [];

    const uniqueContacts = [
        ...new Map(
            recentContacts
                .filter((contact) => contact.email !== user?.email)
                .map((contact) => [
                    contact.email,
                    contact,
                ])
        ).values(),
    ];


    const handleTransfer = async () => {
        try {
            if (!recipient || !amount) {
                toast.error("Please fill all fields");
                return;
            }
            if (Number(amount) <= 0) {
                toast.error("Amount must be greater than 0");
                return;
            }
            setLoading(true);
            const data = await createTransaction({
                toAccount: recipient.trim().toLowerCase(),
                amount: Number(amount),
                idempotencyKey: crypto.randomUUID()
            })
            toast.success("Transaction successful!");

            dispatch(fetchBalance());
            dispatch(fetchTransactions());
            dispatch(fetchMonthlyAnalytics());
        } catch (error) {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed!");
        } finally {
            setLoading(false);
            setRecipient("");
            setAmount("");
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
                    type="email"
                    placeholder="Enter recipient email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
                />

            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {uniqueContacts.slice(0, 5).map((contact) => (
                    <button
                        key={contact.email}
                        type="button"
                        onClick={() => setRecipient(contact.email)}
                        className="bg-zinc-800 px-3 py-2 rounded-lg text-sm hover:bg-zinc-700"
                    >
                        {contact.name}
                    </button>
                ))}
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
            <button
                onClick={handleTransfer}
                disabled={loading || !recipient || !amount}
                className="w-full bg-cyan-400 text-black font-semibold py-3 rounded-xl hover:bg-cyan-300 transition"
            >
                {loading ? "Processing..." : "Transfer"}
            </button>

            {/* Advanced Transfer Link */}
            <Link
                to="/transfers"
                className="text-cyan-400 text-sm mt-3 block text-center hover:underline"
            >
                Advanced Transfer →
            </Link>
        </div>
    );
}