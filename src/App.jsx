import React, { useState } from 'react';
import Header from './components/Header';
import InfoBanner from './components/InfoBanner';
import HarvestingCard from './components/HarvestingCard';
import HoldingsTable from './components/HoldingsTable';
import { mockHoldings } from './data/holdings';
import { useTaxCalculations } from './hooks/useTaxCalculations';

const App = () => {
  const [holdings, setHoldings] = useState(
    mockHoldings.map(h => ({ ...h, selected: false }))
  );

  const { preHarvest, postHarvest, reduction, hasReduction } = useTaxCalculations(holdings);

  const handleToggle = (id) => {
    setHoldings(prev => prev.map(h => 
      h.id === id ? { ...h, selected: !h.selected } : h
    ));
  };

  const handleSelectAll = (selected) => {
    setHoldings(prev => prev.map(h => ({ ...h, selected })));
  };

  const allSelected = holdings.length > 0 && holdings.every(h => h.selected);

  const formatCurrency = (val) => {
    return Math.abs(val).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text transition-colors duration-300">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <InfoBanner />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HarvestingCard
            title="Pre Harvesting"
            variant="neutral"
            stats={preHarvest}
            footerLabel="Realised Capital Gains"
          />
          <HarvestingCard
            title="After Harvesting"
            variant="gradient"
            stats={postHarvest}
            footerLabel="Effective Capital Gains"
            savingsMessage={hasReduction ? `Your taxable capital gains are reduced by : $${formatCurrency(reduction)}` : undefined}
          />
        </div>

        {/* Holdings Table */}
        <HoldingsTable
          holdings={holdings}
          onToggle={handleToggle}
          onSelectAll={handleSelectAll}
          allSelected={allSelected}
        />
      </main>

      <footer className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2026 KoinX. All rights reserved. Built for production-ready tax loss harvesting.
      </footer>
    </div>
  );
};

export default App;
