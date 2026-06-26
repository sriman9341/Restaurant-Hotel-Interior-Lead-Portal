import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-luxury-brass/30 text-luxury-brass hover:bg-luxury-brass/10 hover:border-luxury-brass/75 transition-all duration-300 focus:outline-none shadow-sm"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 animate-pulse" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
