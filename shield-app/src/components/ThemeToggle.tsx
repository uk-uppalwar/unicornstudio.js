import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check localStorage first
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;

    // Fallback to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-bg-secondary text-text-primary hover:bg-opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-primary border border-border shadow-sm"
      aria-label="Toggle Theme"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5">
        {/* Moon Icon (Dark Mode) */}
        <svg
          className={`absolute inset-0 w-full h-full transform transition-all duration-500 ease-spring ${
            theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>

        {/* Sun Icon (Light Mode) */}
        <svg
          className={`absolute inset-0 w-full h-full transform transition-all duration-500 ease-spring ${
            theme === 'light' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
    </button>
  );
}
