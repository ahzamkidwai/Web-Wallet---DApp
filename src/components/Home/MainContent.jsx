import { useState } from "react";
import Airdrop from "../Airdrop";
import Footer from "./Footer";
import SendTokens from "../SendTokens";
import SignMessage from "../SignMessage";

const MainContent = () => {
  const [activeTab, setActiveTab] = useState("airdrop");

  const tabOptions = [
    { key: "airdrop", label: "Request Airdrop" },
    { key: "sendTransaction", label: "Send a Transaction" },
    { key: "signMessage", label: "Sign a Message" },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "airdrop":
        return <Airdrop />;
      case "sendTransaction":
        return <SendTokens />;
      case "signMessage":
        return <SignMessage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-inter text-gray-800">
      {/* Tabs Header */}
      <div className="sticky top-0 z-10 flex justify-center gap-4 bg-white border-b border-gray-200 py-4 shadow-sm">
        {tabOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-5 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
              activeTab === key
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex grow items-start justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300">
          {renderActiveTab()}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainContent;
