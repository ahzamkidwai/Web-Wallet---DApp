# Decentralized App (Solana)

A decentralized application (dApp) built on **Solana Devnet** that allows you to:

- Send SOL or SPL tokens
- Request SOL airdrops
- Sign messages with your wallet

## Features

- Wallet integration using [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- Works on **Solana Devnet**
- Built with **React**, **Vite**, and **TailwindCSS**

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/decentralizedapp.git
cd decentralizedapp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
npm run preview
```

### Dependencies

```bash
@solana/web3.js – Solana blockchain interactions
@solana/wallet-adapter-* – Wallet connection & UI components
@noble/curves & bs58 – Cryptography & encoding
react & react-dom – Frontend framework
tailwindcss – Styling
```

### Note

```bash
All blockchain interactions run on Solana Devnet.
Make sure your wallet (Phantom, Solflare, etc.) is connected to Devnet.
```
