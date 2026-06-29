import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Menu, X, LogOut, LayoutDashboard, BarChart2 } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    const fullPath = location.pathname + location.hash;
    if (path === '/' && (fullPath === '/' || fullPath === '/#home')) return true;
    return fullPath === path;
  };

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive(path)
        ? 'text-luxury-gold border-b-2 border-luxury-gold'
        : 'text-luxury-slate dark:text-luxury-ivory hover:text-luxury-brass'
    }`;

  return (
    <nav className="bg-luxury-cream/80 dark:bg-luxury-dark/90 backdrop-blur-md border-b border-luxury-brass/10 sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold font-serif tracking-widest bg-gradient-to-r from-luxury-brass via-luxury-gold to-luxury-brass bg-clip-text text-transparent">
              GLORY SIMON
            </span>
            <span className="text-xs uppercase tracking-widest text-luxury-slate/60 dark:text-luxury-ivory/60 border-l border-luxury-brass/30 pl-2 hidden sm:inline-block">
              Interiors
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/#home" className={linkClass('/#home')}>
              Home
            </Link>
            <Link to="/#about" className={linkClass('/#about')}>
              About Us
            </Link>
            <Link to="/#services" className={linkClass('/#services')}>
              Services
            </Link>
            <Link to="/#portfolio" className={linkClass('/#portfolio')}>
              Portfolio
            </Link>
            <Link to="/#contact" className={linkClass('/#contact')}>
              Contact
            </Link>
            <Link to="/enquire" className={linkClass('/enquire')}>
              Get Quote
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={linkClass('/dashboard')}>
                  <span className="flex items-center gap-1.5">
                    <LayoutDashboard className="w-4 h-4" /> Admin Portal
                  </span>
                </Link>
                <Link to="/analytics" className={linkClass('/analytics')}>
                  <span className="flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4" /> Analytics
                  </span>
                </Link>
                <button
                   onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded border border-luxury-brass/45 text-luxury-brass hover:bg-luxury-brass hover:text-luxury-dark dark:hover:text-luxury-dark transition-all duration-300 text-sm font-semibold"
              >
                Admin Login
              </Link>
            )}
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-luxury-slate dark:text-luxury-ivory focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-luxury-cream dark:bg-luxury-dark border-t border-luxury-brass/10 px-2 pt-2 pb-4 space-y-1 sm:px-3 animate-fade-in transition-colors duration-300">
          <Link
            to="/#home"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-luxury-slate dark:text-luxury-ivory hover:bg-luxury-brass/10"
          >
            Home
          </Link>
          <Link
            to="/#about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-luxury-slate dark:text-luxury-ivory hover:bg-luxury-brass/10"
          >
            About Us
          </Link>
          <Link
            to="/#services"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-luxury-slate dark:text-luxury-ivory hover:bg-luxury-brass/10"
          >
            Services
          </Link>
          <Link
            to="/#portfolio"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-luxury-slate dark:text-luxury-ivory hover:bg-luxury-brass/10"
          >
            Portfolio
          </Link>
          <Link
            to="/#contact"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-luxury-slate dark:text-luxury-ivory hover:bg-luxury-brass/10"
          >
            Contact
          </Link>
          <Link
            to="/enquire"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-luxury-slate dark:text-luxury-ivory hover:bg-luxury-brass/10"
          >
            Get Quote
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-luxury-slate dark:text-luxury-ivory hover:bg-luxury-brass/10"
              >
                Admin Portal
              </Link>
              <Link
                to="/analytics"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-luxury-slate dark:text-luxury-ivory hover:bg-luxury-brass/10"
              >
                Analytics
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-rose-500 hover:bg-rose-50/10"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-luxury-brass hover:bg-luxury-brass/10"
            >
              Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
