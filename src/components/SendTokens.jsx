import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

const SendTokens = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      setAmount(value);
    }
  };

  const sendTokensHandler = async () => {
    if (!recipientPublicKey) {
      alert("❌ Please enter a valid recipient public key.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("❌ Please enter a valid amount in lamports.");
      return;
    }
    if (!wallet.publicKey) {
      alert("❌ Wallet not connected!");
      return;
    }

    if (!wallet.connected) {
      alert("❌ Wallet not connected!");
      return;
    }

    let toPubkey;
    try {
      toPubkey = new PublicKey(recipientPublicKey);
      console.log("Recipient Public Key:", toPubkey);
    } catch (err) {
      alert("❌ Invalid recipient public key.");
      return;
    }

    setLoading(true);
    try {
      const lamports = Number(amount) * LAMPORTS_PER_SOL; // if input is lamports
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey,
          lamports,
        })
      );

      const signature = await wallet.sendTransaction(transaction, connection);
      //   await connection.confirmTransaction(signature, "confirmed");
      alert(`✅ Transaction successful! Signature: ${signature}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert(`❌ Transaction failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all hover:scale-[1.01]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-5">
          <h2 className="text-2xl font-semibold">Send SOL Tokens</h2>
          <p className="text-sm opacity-90 mt-1">
            Securely transfer tokens on Solana network
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Recipient Public Key
            </label>

            <input
              type="text"
              value={recipientPublicKey}
              onChange={(e) => setRecipientPublicKey(e.target.value)}
              placeholder="Enter recipient's public key"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Amount (Lamports)
            </label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={sendTokensHandler}
            disabled={loading}
            className={`w-full text-white font-medium py-3 rounded-lg shadow-md transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600"
            }`}
          >
            {loading ? "Processing..." : "Send Tokens"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm py-3 border-t border-gray-100">
          Connected Wallet:{" "}
          <span className="text-gray-700 font-medium">
            {wallet?.publicKey
              ? `${wallet.publicKey.toBase58().slice(0, 8)}...`
              : "Not Connected"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SendTokens;
