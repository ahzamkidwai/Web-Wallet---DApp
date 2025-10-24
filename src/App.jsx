import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import HomeHeader from "./components/Home/HomeHeader";
import MainContent from "./components/Home/MainContent";

function App() {
  return (
    // <ConnectionProvider
    //   endpoint={"https://solana-devnet.g.alchemy.com/v2/Bo5LNH7NRVn-HCcFk6gtm"}
    // >
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen flex flex-col bg-linear-to-b from-gray-50 to-gray-100 text-gray-800">
            <HomeHeader />
            <MainContent />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
