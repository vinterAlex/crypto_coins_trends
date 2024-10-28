import React from 'react';
import { Coins } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">CryptoTrends</h1>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Portfolio</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Markets</a>
          </nav>
        </div>
      </div>
    </header>
  );
}