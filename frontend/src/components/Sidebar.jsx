import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, PlusCircle } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Add Lead (Form)', path: '/enquire', icon: PlusCircle }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-luxury-cream dark:bg-luxury-dark border-r border-luxury-brass/10 h-[calc(100vh-80px)] sticky top-20 hidden md:block transition-colors duration-300">
      <div className="p-6">
        <h2 className="text-xs uppercase tracking-widest text-luxury-brass font-semibold mb-6">
          Admin Console
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-luxury-brass/10 text-luxury-gold shadow-sm font-semibold'
                    : 'text-luxury-slate/75 dark:text-luxury-ivory/75 hover:bg-luxury-brass/5 hover:text-luxury-brass'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
