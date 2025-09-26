import { useState } from "react";
import { addTradeApi } from "../services/TradesApi";
import { useNavigate } from "react-router-dom";

function TradePage() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [type, setType] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const symbolsList = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT", "ADAUSDT"];

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await addTradeApi(
        { symbol, type, quantity: Number(quantity) }
      );
      setMessage(res.data.message);
      setQuantity("");
      navigate("/")
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center  w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 ">Add Trade</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        {/* Symbol */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Symbol</label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {symbolsList.map((sym) => (
              <option key={sym} value={sym}>
                {sym}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Processing..." : "Execute Trade"}
        </button>

        {/* Message */}
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
}

export default TradePage;
