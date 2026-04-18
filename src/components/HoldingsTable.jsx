import React, { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const HoldingsTable = ({
  holdings,
  onToggle,
  onSelectAll,
  allSelected,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedHoldings = useMemo(() => {
    let sortableItems = [...holdings];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue;
        let bValue;

        switch (sortConfig.key) {
          case 'assetName':
            aValue = a.assetName.toLowerCase();
            bValue = b.assetName.toLowerCase();
            break;
          case 'amount':
            aValue = a.amount;
            bValue = b.amount;
            break;
          case 'totalValue':
            aValue = a.amount * a.currentPrice;
            bValue = b.amount * b.currentPrice;
            break;
          case 'stGain':
            aValue = a.stGain;
            bValue = b.stGain;
            break;
          case 'ltGain':
            aValue = a.ltGain;
            bValue = b.ltGain;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [holdings, sortConfig]);

  const displayedHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 5);

  const formatValue = (val, isCurrency = true) => {
    const absVal = Math.abs(val);
    if (absVal > 0 && absVal < 0.01) {
      return `${isCurrency ? '$ ' : ''}${val.toExponential(4)}`;
    }
    const formatted = absVal.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${isCurrency ? '$ ' : ''}${val < 0 ? '-' : ''}${formatted}`;
  };

  const getGainColor = (val) => {
    if (val > 0) return 'text-green-500';
    if (val < 0) return 'text-red-500';
    return 'text-gray-400';
  };

  const Tooltip = ({ children, content }) => (
    <div className="group relative inline-block w-full cursor-default text-left">
      {children}
      <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-white border border-gray-800 dark:border-gray-200 text-white dark:text-gray-900 text-[11px] font-bold rounded-lg shadow-2xl whitespace-nowrap z-[1000] transition-all opacity-0 group-hover:opacity-100 pointer-events-none scale-95 group-hover:scale-100 transform origin-bottom">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[6px] border-transparent border-t-gray-900 dark:border-t-white"></div>
      </div>
    </div>
  );

  const SortIcon = ({ column }) => {
    if (sortConfig?.key !== column) return <ChevronsUpDown className="ml-1 h-3 w-3 opacity-30" />;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="ml-1 h-3 w-3 text-blue-600" />
    ) : (
      <ChevronDown className="ml-1 h-3 w-3 text-blue-600" />
    );
  };

  return (
    <div className="card !p-0 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Holdings</h3>
      </div>
      
      <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
        <table className="w-full text-left min-w-[1100px] border-separate border-spacing-0">
          <thead className="table-header sticky top-0 z-10 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 w-12 border-b border-gray-100 dark:border-gray-700">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </th>
              <th 
                className="px-6 py-4 font-semibold min-w-[200px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700"
                onClick={() => handleSort('assetName')}
              >
                <div className="flex items-center">Asset <SortIcon column="assetName" /></div>
              </th>
              <th 
                className="px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center justify-end">
                  <div className="text-right">
                    Holdings <div className="text-[10px] font-normal text-gray-400">Avg Buy Price</div>
                  </div>
                  <SortIcon column="amount" />
                </div>
              </th>
              <th className="px-6 py-4 text-right font-semibold border-b border-gray-100 dark:border-gray-700">Current Price</th>
              <th 
                className="px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700"
                onClick={() => handleSort('stGain')}
              >
                <div className="flex items-center justify-end text-right">
                  Short-term Gain
                  <SortIcon column="stGain" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700"
                onClick={() => handleSort('ltGain')}
              >
                <div className="flex items-center justify-end text-right">
                  Long-term Gain
                  <SortIcon column="ltGain" />
                </div>
              </th>
              <th className="px-6 py-4 text-right font-semibold border-b border-gray-100 dark:border-gray-700">Amount to Sell</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {displayedHoldings.map((holding) => {
              const formattedHoldings = (holding.amount ?? 0) < 0.0001 && (holding.amount ?? 0) > 0 
                ? (holding.amount ?? 0).toExponential(6) 
                : (holding.amount ?? 0).toLocaleString(undefined, { maximumFractionDigits: 6 });
              
              const getTooltipContent = (val, isCurrency = true) => {
                const absVal = Math.abs(val);
                if (absVal > 0 && absVal < 0.01) {
                  return `${isCurrency ? '$ ' : ''}${val.toLocaleString(undefined, { maximumFractionDigits: 18 })}`;
                }
                return formatValue(val, isCurrency);
              };

              const fullStGain = getTooltipContent(holding.stGain ?? 0);
              const fullLtGain = getTooltipContent(holding.ltGain ?? 0);
              const fullCurrentPrice = getTooltipContent(holding.currentPrice ?? 0);
              const fullHoldings = `${(holding.amount ?? 0).toLocaleString(undefined, { maximumFractionDigits: 18 })} ${holding.assetSymbol}`;

              return (
                <tr
                  key={holding.id}
                  className={cn(
                    "table-row group/row transition-colors",
                    holding.selected ? "bg-blue-50/50 dark:bg-blue-900/10" : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                  )}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={holding.selected}
                      onChange={() => onToggle(holding.id)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={holding.assetLogo} 
                        alt={holding.assetSymbol} 
                        className="h-9 w-9 rounded-full border border-gray-100 dark:border-gray-700 bg-white"
                        onError={(e) => {
                          e.currentTarget.src = 'https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg';
                        }}
                      />
                      <div className="overflow-hidden">
                        <div className="font-semibold text-gray-900 dark:text-white truncate" title={holding.assetName}>
                          {holding.assetName}
                        </div>
                        <div className="text-xs text-gray-400">{holding.assetSymbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Tooltip content={fullHoldings}>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {formattedHoldings} {holding.assetSymbol}
                      </div>
                    </Tooltip>
                    <div className="text-xs text-gray-400">
                      $ {(holding.avgPrice ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Tooltip content={fullCurrentPrice}>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        $ {(holding.currentPrice ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </Tooltip>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Tooltip content={fullStGain}>
                      <div className={cn("font-medium", getGainColor(holding.stGain ?? 0))}>
                        {(holding.stGain ?? 0) > 0 ? '+' : ''}{formatValue(holding.stGain ?? 0)}
                      </div>
                    </Tooltip>
                    <div className="text-[10px] text-gray-400">
                      {(holding.stBalance ?? 0).toLocaleString(undefined, { maximumFractionDigits: 8 })} {holding.assetSymbol}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Tooltip content={fullLtGain}>
                      <div className={cn("font-medium", getGainColor(holding.ltGain ?? 0))}>
                        {(holding.ltGain ?? 0) > 0 ? '+' : ''}{formatValue(holding.ltGain ?? 0)}
                      </div>
                    </Tooltip>
                    <div className="text-[10px] text-gray-400">
                      {(holding.ltBalance ?? 0).toLocaleString(undefined, { maximumFractionDigits: 8 })} {holding.assetSymbol}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {holding.selected ? (
                      <div className="font-semibold text-blue-600 dark:text-blue-400">
                        {formattedHoldings} {holding.assetSymbol}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {holdings.length > 5 && (
        <div className="p-4 bg-gray-50/50 dark:bg-gray-800/30 text-center border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="group/btn flex items-center gap-2 mx-auto text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", showAll && "rotate-180")} />
            {showAll ? 'View less' : 'View all'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
