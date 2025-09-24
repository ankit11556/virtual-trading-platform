# Virtual Trading Platform (Exness-like)

This is a **Virtual Trading Platform** built for internship assignment purposes. It allows users to practice trading with virtual money without any real financial risk. The platform simulates real trading conditions for Forex, Stocks, Commodities, and Crypto (via Binance API).

---

## 🚀 Live Demo

- **Frontend (Vercel):** [Live Link](https://virtual-trading-platform-ruby.vercel.app)

  ---

## 🌟 Features

- **User Authentication**
  - Signup/Login (email & password)
  - Protected routes using JWT

- **Virtual Wallet**
  - Default balance: $10,000
  - Balance updates automatically after each trade

- **Market Data & Charts**
  - Real-time prices from Binance API
  - Candlestick & line charts
  - Multiple symbols support (BTCUSDT, ETHUSDT, BNBUSDT, XRPUSDT, ADAUSDT)

- **Trading Execution**
  - Buy/Sell functionality
  - Basic order types
  - Trade confirmation and balance update

- **Trade History**
  - View all executed trades with date, time, price, and profit/loss

- **Portfolio**
  - Holdings per symbol
  - Current market value and total portfolio value

- **Analytics Dashboard**
  - Total trades
  - Win/Loss ratio
  - Average profit per trade
  - Total profit/loss

- **Admin Panel** (backend ready)
  - Add/Remove users
  - Reset balances
  - Monitor activity

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Market Data API:** Binance API  
- **Deployment:** Frontend → Vercel, Backend → Render

---

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/ankit11556/virtual-trading-platform.git

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup
cd backend
npm install
npm start
