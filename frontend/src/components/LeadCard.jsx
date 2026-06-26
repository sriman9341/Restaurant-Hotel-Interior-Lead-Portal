import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Square, User } from 'lucide-react';

const LeadCard = ({ lead }) => {
  const getStatusColor = (status) => {
    const mappings = {
      'New Lead': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
      'Contacted': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
      'Site Visit Scheduled': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
      'Requirement Gathering': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800',
      'Quotation Sent': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
      'Design Approval': 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
      'Project Started': 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800',
      'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
    };
    return mappings[status] || 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300';
  };

  return (
    <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 hover:border-luxury-brass/35 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold tracking-wide ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
          <span className="text-xs text-luxury-slate/40 dark:text-luxury-ivory/40">
            {new Date(lead.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-lg font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-1">
          {lead.name}
        </h3>
        <p className="text-xs font-semibold text-luxury-brass mb-3 uppercase tracking-wider">
          {lead.projectType} • {lead.company || 'Private Client'}
        </p>

        <div className="space-y-2 text-sm text-luxury-slate/70 dark:text-luxury-ivory/70 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-luxury-brass/65 shrink-0" />
            <span className="truncate">{lead.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-luxury-brass/65 shrink-0" />
            <span>{lead.area} Sq Ft | {lead.seatingCapacity} Seating</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-luxury-brass/65 shrink-0" />
            <span>Owner: {lead.owner}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-luxury-brass/10 flex justify-between items-center">
        <span className="px-2 py-0.5 text-xs font-semibold rounded bg-luxury-brass/10 text-luxury-gold border border-luxury-brass/20">
          {lead.theme}
        </span>
        <Link
          to={`/leads/${lead._id}`}
          className="text-sm font-semibold text-luxury-gold hover:text-luxury-brass transition-colors"
        >
          Manage Lead &rarr;
        </Link>
      </div>
    </div>
  );
};

export default LeadCard;
