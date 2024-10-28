import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CryptoList } from './components/CryptoList';
import { Coins } from 'lucide-react';
import type { CryptoData } from './types/crypto';

function App() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 12,
              page: 1,
              sparkline: false
            }
          }
        );
        setCryptos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch crypto data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCryptos();
    const interval = setInterval(fetchCryptos, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-4 mb-8">
          <Coins size={40} className="text-blue-500" />
          <h1 className="text-4xl font-bold text-gray-900">Crypto Tracker</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Track real-time cryptocurrency prices and market trends
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <CryptoList cryptos={cryptos} />
      </main>

      <footer className="max-w-7xl mx-auto mt-12 text-center text-gray-500">
        <p>Data provided by CoinGecko API</p>
      </footer>
    </div>
  );
}

export default App;