import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      setAmount(value);
    }
  };

  const fetchBalance = async () => {
    if (wallet.publicKey) {
      try {
        const lamports = await connection.getBalance(wallet.publicKey);
        const sol = lamports / LAMPORTS_PER_SOL;
        setBalance(sol);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [wallet.publicKey]);

  const sendAirdropToUser = async () => {
    try {
      if (!wallet.publicKey) {
        alert("❌ Wallet not connected!");
        return;
      }

      const lamports = Number(amount);
      if (isNaN(lamports) || lamports <= 0) {
        alert("❌ Please enter a valid airdrop amount in lamports.");
        return;
      }

      setLoading(true);
      console.log("Requesting airdrop of", lamports, "lamports");

      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        lamports
      );
      await connection.confirmTransaction(signature, "confirmed");

      alert(
        `✅ Airdropped ${lamports} lamports to ${wallet.publicKey.toBase58()}`
      );
      await fetchBalance();
    } catch (error) {
      alert("❌ Airdrop failed: " + error.message);
      console.log("Airdrop error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden transform transition-all hover:scale-[1.01]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-5">
          <h2 className="text-2xl font-semibold">Solana Airdrop</h2>
          <p className="text-sm opacity-90 mt-1">
            Instantly get SOL in your connected wallet
          </p>
        </div>

        {/* Wallet Info */}
        <div className="p-6 space-y-5">
          {wallet.connected ? (
            <>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-center text-gray-600">
                <p className="break-all">
                  <span className="font-semibold text-gray-800">Wallet:</span>{" "}
                  {wallet.publicKey.toBase58()}
                </p>
              </div>
              <p className="text-center text-gray-700 font-medium">
                💰 Current Balance:{" "}
                <span className="font-semibold text-indigo-600">
                  {balance !== null
                    ? `${balance.toFixed(4)} SOL`
                    : "Loading..."}
                </span>
              </p>
            </>
          ) : (
            <p className="text-center text-gray-500">
              Connect your wallet to see balance
            </p>
          )}

          {/* Input Field */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Amount (Lamports)
            </label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={handleChange}
              placeholder="Enter Amount (lamports)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            onClick={sendAirdropToUser}
            className={`w-full text-white font-medium py-3 rounded-lg shadow-md transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600"
            }`}
          >
            {loading ? "Processing..." : "Send Airdrop"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs py-3 border-t border-gray-100">
          Powered by Solana Devnet ⚡
        </div>
      </div>
    </div>
  );
};

export default Airdrop;
