import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const HarvestingCard = ({
  title,
  variant = 'neutral',
  stats,
  footerLabel,
  savingsMessage,
}) => {
  const isGradient = variant === 'gradient';

  const formatCurrency = (val) => {
    const absVal = Math.abs(val);
    let formatted;

    if (absVal > 0 && absVal < 0.01) {
      formatted = absVal.toExponential(4);
    } else {
      formatted = absVal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return `${val < 0 ? '-' : ''}$${formatted}`;
  };

  return (
    <div className={cn(
      "relative flex flex-col h-full",
      isGradient ? "gradient-card" : "card"
    )}>
      <h3 className={cn(
        "text-lg font-bold mb-6",
        isGradient ? "text-white" : "text-gray-900 dark:text-white"
      )}>
        {title}
      </h3>

      <div className="space-y-4 mb-8">
        {/* Header Labels */}
        <div className="grid grid-cols-2 text-right">
          <span className={isGradient ? "text-white/70" : "text-gray-400"}>Short-term</span>
          <span className={isGradient ? "text-white/70" : "text-gray-400"}>Long-term</span>
        </div>

        {/* Profits */}
        <div className="flex items-center justify-between">
          <span className={isGradient ? "text-white/80" : "text-gray-600 dark:text-gray-400"}>Profits</span>
          <div className="grid grid-cols-2 text-right w-2/3">
            <span className={cn("font-medium", isGradient ? "text-white" : "text-gray-900 dark:text-white")}>
              {formatCurrency(stats.st.profits)}
            </span>
            <span className={cn("font-medium", isGradient ? "text-white" : "text-gray-900 dark:text-white")}>
              {formatCurrency(stats.lt.profits)}
            </span>
          </div>
        </div>

        {/* Losses */}
        <div className="flex items-center justify-between">
          <span className={isGradient ? "text-white/80" : "text-gray-600 dark:text-gray-400"}>Losses</span>
          <div className="grid grid-cols-2 text-right w-2/3">
            <span className={cn("font-medium", isGradient ? "text-white" : "text-gray-900 dark:text-white")}>
              {formatCurrency(stats.st.losses)}
            </span>
            <span className={cn("font-medium", isGradient ? "text-white" : "text-gray-900 dark:text-white")}>
              {formatCurrency(stats.lt.losses)}
            </span>
          </div>
        </div>

        {/* Net Capital Gains */}
        <div className="flex items-center justify-between">
          <span className={isGradient ? "text-white/80" : "text-gray-600 dark:text-gray-400"}>Net Capital Gains</span>
          <div className="grid grid-cols-2 text-right w-2/3">
            <span className={cn("font-medium", isGradient ? "text-white" : "text-gray-900 dark:text-white")}>
              {formatCurrency(stats.st.net)}
            </span>
            <span className={cn("font-medium", isGradient ? "text-white" : "text-gray-900 dark:text-white")}>
              {formatCurrency(stats.lt.net)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10 dark:border-gray-700">
        <div className="flex items-baseline justify-between">
          <span className={cn(
            "text-lg font-bold",
            isGradient ? "text-white" : "text-gray-900 dark:text-white"
          )}>
            {footerLabel}:
          </span>
          <span className={cn(
            "text-3xl font-bold",
            isGradient ? "text-white" : "text-gray-900 dark:text-white"
          )}>
            {formatCurrency(stats.total)}
          </span>
        </div>
        
        {savingsMessage && (
          <div className="mt-4 flex items-center gap-2 text-white/90 font-medium animate-pulse">
            <span>🎉</span>
            <span>{savingsMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HarvestingCard;
