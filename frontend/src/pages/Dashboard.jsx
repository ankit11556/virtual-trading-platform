import { useEffect, useState } from "react";
import axios from "axios";
import { walletBalanceApi } from "../services/WalletBalance";
import { getTradeHistoryApi } from "../services/TradesApi";


function Dashboard() {
  const [wallet, setWallet] = useState(0);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wallet balance
  const fetchWallet = async () => {
    try {
      const res = await walletBalanceApi();
      setWallet(res.data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch recent trades
  const fetchTrades = async () => {
    try {
      const res = await getTradeHistoryApi()
      const tradesArray = res.data.trades || res.data || []; 
      setTrades(tradesArray.reverse().slice(0, 5)); // last 5 trades
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchWallet();
      await fetchTrades();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold">Wallet Balance</h2>
        <p className="text-3xl font-bold mt-2">${wallet.toLocaleString()}</p>
      </div>

    
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-600">Total Trades</h3>
          <p className="text-2xl font-bold mt-1">{trades.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-600">Win Trades</h3>
          <p className="text-2xl font-bold mt-1">
            {trades.filter((t) => t.profitLoss > 0).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-600">Loss Trades</h3>
          <p className="text-2xl font-bold mt-1">
            {trades.filter((t) => t.profitLoss <= 0).length}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
        {trades.length === 0 ? (
          <p>No trades yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2">Symbol</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">P/L</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade._id} className="text-center border-b">
                    <td className="px-4 py-2 font-semibold">{trade.symbol}</td>
                    <td
                      className={`px-4 py-2 font-bold ${
                        trade.type === "buy" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {trade.type.toUpperCase()}
                    </td>
                    <td className="px-4 py-2">{trade.quantity}</td>
                    <td className="px-4 py-2">${trade.price}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        trade.profitLoss > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ${trade.profitLoss}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(trade.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
