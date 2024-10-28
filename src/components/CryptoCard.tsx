import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { CryptoData } from '../types/crypto';

interface Props {
  crypto: CryptoData;
}

export function CryptoCard({ crypto }: Props) {
  const isPositive = crypto.price_change_percentage_24h > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4">
        <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
        <div>
          <h3 className="font-bold text-lg">{crypto.name}</h3>
          <p className="text-gray-500 uppercase">{crypto.symbol}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</p>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          <span className="font-semibold">
            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-gray-600">
          Market Cap: ${crypto.market_cap.toLocaleString()}
        </p>
      </div>
    </div>
  );
}