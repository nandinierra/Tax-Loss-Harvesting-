import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const InfoBanner = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card !p-0 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Important Notes & Disclaimers</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="border-t border-gray-100 p-4 pt-0 dark:border-gray-700">
          <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfoBanner;
