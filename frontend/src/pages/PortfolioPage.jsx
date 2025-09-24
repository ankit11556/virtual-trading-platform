import { useEffect, useState } from "react";
import { getPortfolioApi } from "../services/PortfolioApi";
import { walletBalanceApi } from "../services/WalletBalance";

function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);

      // Portfolio API call
      const res = await getPortfolioApi();

      setPortfolio(res.data.portfolio);
      setTotalValue(res.data.totalPortfolioValue);

      
      const walletRes = await walletBalanceApi();
      setBalance(walletRes.data.balance);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const netWorth = balance + totalValue;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Portfolio</h1>

      {loading ? (
        <p className="text-center">Loading portfolio...</p>
      ) : (
        <>
          <div className="text-center mb-6">
            <p className="text-xl font-semibold">Wallet Balance: ${balance.toFixed(2)}</p>
            <p className="text-xl font-semibold">Holdings Value: ${totalValue.toFixed(2)}</p>
            <p className="text-2xl font-bold mt-2">Net Worth: ${netWorth.toFixed(2)}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-2 px-4">Symbol</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Current Price</th>
                  <th className="py-2 px-4">Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((h) => (
                  <tr key={h.symbol} className="text-center border-b">
                    <td className="py-2 px-4">{h.symbol}</td>
                    <td className="py-2 px-4">{h.quantity}</td>
                    <td className="py-2 px-4">${h.currentPrice.toFixed(2)}</td>
                    <td className="py-2 px-4">${h.totalValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default PortfolioPage;
