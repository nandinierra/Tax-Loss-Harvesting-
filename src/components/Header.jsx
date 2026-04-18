import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-dark-bg/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            K
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Koin<span className="text-blue-600">X</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">Tax Harvesting</span>
            <div className="group relative">
              <a className="text-sm font-medium text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline cursor-pointer">
                How it works?
              </a>
              {/* Tooltip Popup */}
              <div className="invisible absolute top-full left-1/2 mt-2 w-80 -translate-x-1/2 rounded-xl bg-gray-900 p-6 shadow-2xl ring-1 ring-white/10 transition-all group-hover:visible group-hover:opacity-100 opacity-0 z-[100] dark:bg-white dark:ring-black/5 text-left">
                <div className="absolute -top-1.5 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-gray-900 dark:bg-white shadow-[-1px_-1px_0_0_rgba(255,255,255,0.1)] dark:shadow-[-1px_-1px_0_0_rgba(0,0,0,0.05)]"></div>
                <ul className="space-y-3 text-sm text-gray-300 dark:text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-blue-400 dark:text-blue-600 font-bold">•</span>
                    See your capital gains for FY 2024-25 in the left card
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400 dark:text-blue-600 font-bold">•</span>
                    Check boxes for assets you plan on selling to reduce your tax liability
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400 dark:text-blue-600 font-bold">•</span>
                    Instantly see your updated tax liability in the right card
                  </li>
                </ul>
                <div className="mt-4 border-t border-gray-800 pt-4 dark:border-gray-100">
                  <p className="text-sm font-semibold text-white dark:text-gray-900">
                    Pro tip: <span className="font-normal text-gray-400 dark:text-gray-500">Experiment with different combinations of your holdings to optimize your tax liability</span>
                  </p>
                </div>
              </div>
            </div>
          </nav>
          
          <button
            onClick={toggleTheme}
            className="btn-icon bg-gray-50 dark:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
