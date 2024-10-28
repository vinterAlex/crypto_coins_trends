import React from 'react';
import { CryptoCard } from './CryptoCard';
import type { CryptoData } from '../types/crypto';

interface Props {
  cryptos: CryptoData[];
}

export function CryptoList({ cryptos }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cryptos.map((crypto) => (
        <CryptoCard key={crypto.id} crypto={crypto} />
      ))}
    </div>
  );
}