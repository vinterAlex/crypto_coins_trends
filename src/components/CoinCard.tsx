import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import type { Coin } from '../types';

interface CoinCardProps {
  coin: Coin;
}

export function CoinCard({ coin }: CoinCardProps) {
  const priceChange = coin.price_change_percentage_24h;
  const isPositive = priceChange > 0;
  const sparklineData = coin.sparkline_in_7d.price.map((price, index) => ({
    value: price,
    time: index,
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt={coin.name} className="w-8 h-8" />
          <div>
            <h3 className="font-bold text-lg">{coin.name}</h3>
            <p className="text-gray-500 uppercase">{coin.symbol}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
          <span className="font-semibold">{Math.abs(priceChange).toFixed(2)}%</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-2xl font-bold">${coin.current_price.toLocaleString()}</div>
        <div className="text-sm text-gray-500">
          Volume: ${coin.total_volume.toLocaleString()}
        </div>
      </div>

      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
            <defs>
              <linearGradient id={`gradient-${coin.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? '#22c55e' : '#ef4444'}
              fillOpacity={1}
              fill={`url(#gradient-${coin.id})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <TrendingUp size={16} />
        <span className="text-gray-600">7-day trend</span>
      </div>
    </div>
  );
}