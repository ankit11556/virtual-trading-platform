import { useEffect, useState } from "react";
import { getAnalyticsApi } from "../services/AnalyticsApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await getAnalyticsApi();
      setAnalytics(res.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading analytics...</p>;
  if (!analytics) return <p className="text-center mt-10 text-red-500">No analytics data available</p>;

  // Prepare chart data
  const barData = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        label: "Trades",
        data: [analytics.winLossRatio * analytics.totalTrades || 0, analytics.totalTrades - (analytics.winLossRatio * analytics.totalTrades || 0)],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  const lineData = {
    labels: ["0"], // if you have historical profit/loss per trade, replace with proper timeline
    datasets: [
      {
        label: "Total Profit/Loss",
        data: [analytics.totalProfitLoss],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Trading Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Trades</h2>
          <p className="text-2xl font-bold text-indigo-600">{analytics.totalTrades}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">Win/Loss Ratio</h2>
          <p className="text-2xl font-bold text-blue-600">{analytics.winLossRatio}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">Avg Profit/Trade</h2>
          <p className={`text-2xl font-bold ${analytics.avgProfitPerTrade >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${analytics.avgProfitPerTrade}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Profit/Loss</h2>
          <p className={`text-2xl font-bold ${analytics.totalProfitLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${analytics.totalProfitLoss}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">Win vs Loss Trades</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">Total Profit/Loss</h3>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
