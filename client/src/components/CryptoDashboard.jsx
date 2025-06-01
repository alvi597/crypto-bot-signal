import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth, signOut } from '../firebase';
import { useNavigate } from 'react-router-dom';

const CryptoDashboard = () => {
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Top 10 Crypto Signals</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div key={coin.id} className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <img src={coin.image} alt={coin.name} className="h-10 w-10" />
            <h3 className="text-lg font-semibold">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h3>
            <p>Price: ${coin.current_price.toLocaleString()}</p>
            <p className={coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
              24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>

      <footer className="mt-10 text-center border-t border-gray-700 pt-4">
        <p className="text-xl font-semibold border-2 border-white inline-block px-4 py-1 rounded">
          Get best signals
        </p>
      </footer>
    </div>
  );
};

export default CryptoDashboard;
