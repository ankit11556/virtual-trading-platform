import { useState, useEffect } from "react";
import { getMargetPriceApi } from "../services/MarketApi.js";

function MarketPage() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  const symbolsList = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT", "ADAUSDT"];

  
  const fetchPrice = async (selectedSymbol) => {
    try {
      setLoading(true);
      const res = await getMargetPriceApi(selectedSymbol);
      setPrice(res.data.price);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice(symbol);
    const interval = setInterval(() => fetchPrice(symbol), 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  // TradingView Widget Setup
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        width: "100%",
        height: 500,
        symbol: symbol,
        interval: "60",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: "tradingview_chart",
      });
    };
    document.getElementById("tradingview_chart").innerHTML = "";
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [symbol]);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Market</h1>

      {/* Symbol selector */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-semibold">Select Symbol:</label>
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="p-2 rounded border"
        >
          {symbolsList.map((sym) => (
            <option key={sym} value={sym}>
              {sym}
            </option>
          ))}
        </select>
      </div>

      {/* Current Price */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-64 text-center mb-6">
        <h2 className="text-xl font-semibold">{symbol}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p className="text-3xl font-bold mt-2">${price}</p>
        )}
      </div>

      {/* TradingView Chart */}
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <div id="tradingview_chart" className="w-full h-[500px]"></div>
      </div>
    </div>
  );
}

export default MarketPage;
