import React from 'react';

const StatCard = ({ title, value, icon: Icon, description }) => {
  return (
    <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 hover:border-luxury-brass/30 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-luxury-slate/60 dark:text-luxury-ivory/60 uppercase tracking-widest">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-lg bg-luxury-brass/10 text-luxury-gold">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory tracking-tight mb-1">
        {value}
      </div>
      {description && (
        <p className="text-xs text-luxury-slate/50 dark:text-luxury-ivory/50">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
