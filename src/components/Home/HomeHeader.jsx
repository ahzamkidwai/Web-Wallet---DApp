import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const HomeHeader = () => {
  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
      <h1 className="text-xl sm:text-2xl font-semibold text-indigo-700 text-center sm:text-left">
        Solana Wallet Dashboard
      </h1>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <WalletMultiButton className="bg-indigo-600 hover:bg-indigo-700 transition-all" />
        <WalletDisconnectButton className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all" />
      </div>
    </header>
  );
};

export default HomeHeader;
