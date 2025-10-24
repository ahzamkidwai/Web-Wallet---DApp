import { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

const SignMessage = () => {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignMessage = async () => {
    if (!publicKey) {
      alert("❌ Wallet not connected!");
      return;
    }
    if (!signMessage) {
      alert("❌ Wallet does not support message signing!");
      return;
    }
    if (!message) {
      alert("❌ Please enter a message to sign.");
      return;
    }

    setLoading(true);
    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      // Verify signature locally
      const isValid = await ed25519.verify(
        signature,
        encodedMessage,
        publicKey.toBytes()
      );
      if (!isValid) throw new Error("Message signature invalid!");

      alert(
        `✅ Message signed successfully!\nSignature: ${bs58.encode(signature)}`
      );
    } catch (err) {
      console.error(err);
      alert(`❌ Failed to sign message: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden transform transition-all hover:scale-[1.01]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-5">
          <h2 className="text-2xl font-semibold">Sign a Message</h2>
          <p className="text-sm opacity-90 mt-1">
            Sign any message with your connected wallet
          </p>
        </div>

        {/* Wallet Info & Input */}
        <div className="p-6 space-y-5">
          {publicKey ? (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-center text-gray-600 break-all">
              Wallet:{" "}
              <span className="font-semibold text-gray-800">
                {publicKey.toBase58()}
              </span>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Connect your wallet to sign messages
            </p>
          )}

          <div>
            <label className="block text-gray-700 text-sm mb-2">Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message to sign"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={handleSignMessage}
            disabled={loading}
            className={`w-full text-white font-medium py-3 rounded-lg shadow-md transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600"
            }`}
          >
            {loading ? "Signing..." : "Sign Message"}
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

export default SignMessage;
