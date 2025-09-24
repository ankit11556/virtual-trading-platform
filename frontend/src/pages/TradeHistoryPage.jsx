import { useEffect, useState } from "react";
import { getTradeHistoryApi } from "../services/TradesApi";

function TradeHistoryPage() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const res = await getTradeHistoryApi();
      const tradesArray = res.data.trades || res.data || []; // fallback
      setTrades(tradesArray.reverse());
      console.log(res.data);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Trade History</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading trades...</p>
      ) : trades.length === 0 ? (
        <p className="text-center text-gray-500">No trades yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-2 px-4">Symbol</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Profit/Loss</th>
                <th className="py-2 px-4">Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade._id} className="text-center border-b">
                  <td className="py-2 px-4">{trade.symbol}</td>
                  <td className={`py-2 px-4 font-semibold ${trade.type === "buy" ? "text-green-600" : "text-red-600"}`}>
                    {trade.type.toUpperCase()}
                  </td>
                  <td className="py-2 px-4">{trade.quantity}</td>
                  <td className="py-2 px-4">{trade.price.toFixed(2)}</td>
                  <td className="py-2 px-4">{trade.profitLoss?.toFixed(2) || 0}</td>
                  <td className="py-2 px-4">{new Date(trade.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TradeHistoryPage;
