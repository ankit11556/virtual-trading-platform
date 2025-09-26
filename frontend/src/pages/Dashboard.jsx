import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

import { walletBalanceApi } from "../services/WalletBalance";
import { getTradeHistoryApi } from "../services/TradesApi";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [wallet, setWallet] = useState(0);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState({ labels: [], values: [] });

  // Fetch wallet balance
  const fetchWallet = async () => {
    try {
      const res = await walletBalanceApi();
      setWallet(res.data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch recent trades & prepare portfolio chart
  const fetchTrades = async () => {
    try {
      const res = await getTradeHistoryApi();
      const tradesArray = res.data.trades || res.data || [];
      setTrades(tradesArray.reverse().slice(0, 5));

      // Calculate portfolio value per symbol
      const holdings = {};
      tradesArray.forEach((trade) => {
        if (!holdings[trade.symbol]) holdings[trade.symbol] = 0;
        if (trade.type === "buy") holdings[trade.symbol] += trade.quantity * trade.price;
        else if (trade.type === "sell") holdings[trade.symbol] -= trade.quantity * trade.price;
      });

      const labels = Object.keys(holdings).filter((sym) => holdings[sym] > 0);
      const values = labels.map((sym) => holdings[sym]);
      setPortfolioData({ labels, values });

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

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;

  const chartData = {
    labels: portfolioData.labels,
    datasets: [
      {
        label: "Portfolio Value ($)",
        data: portfolioData.values,
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Portfolio Overview" },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Wallet */}
      <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold">Wallet Balance</h2>
        <p className="text-3xl font-bold mt-2">${wallet.toLocaleString()}</p>
      </div>

      {/* Stats */}
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

      {/* Portfolio Chart */}
      {portfolioData.labels.length > 0 && (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

      {/* Recent Trades Table */}
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
                      className={`px-4 py-2 font-bold ${trade.type === "buy" ? "text-green-600" : "text-red-600"}`}
                    >
                      {trade.type.toUpperCase()}
                    </td>
                    <td className="px-4 py-2">{trade.quantity}</td>
                    <td className="px-4 py-2">${trade.price}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${trade.profitLoss > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      ${trade.profitLoss}
                    </td>
                    <td className="px-4 py-2">{new Date(trade.createdAt).toLocaleString()}</td>
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
