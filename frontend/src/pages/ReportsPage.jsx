import React from 'react';
import Sidebar from '../components/Sidebar';
import { FileText, Download, TrendingUp, DownloadCloud } from 'lucide-react';

const ReportsPage = () => {
  const reports = [
    { id: 1, title: 'Q1 Revenue Summary', date: 'Mar 31, 2026', type: 'Financial', size: '2.4 MB' },
    { id: 2, title: 'Lead Conversion Analytics', date: 'Apr 15, 2026', type: 'Sales', size: '1.1 MB' },
    { id: 3, title: 'Vendor Performance Report', date: 'May 02, 2026', type: 'Operations', size: '3.8 MB' },
    { id: 4, title: 'Material Cost Projections', date: 'Jun 10, 2026', type: 'Estimates', size: '1.5 MB' },
  ];

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-luxury-cream dark:bg-luxury-dark transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory">
                Reports & Documents
              </h1>
              <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1">
                Generate and download comprehensive PDF summaries
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold rounded-lg hover:shadow-md transition-all">
              <TrendingUp className="w-4 h-4" /> Generate New Report
            </button>
          </div>

          <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-luxury-brass/10 bg-luxury-cream/50 dark:bg-luxury-dark/50">
              <h2 className="text-lg font-bold font-serif text-luxury-slate dark:text-luxury-ivory">Recent Downloads</h2>
            </div>
            <div className="divide-y divide-luxury-brass/10">
              {reports.map((report) => (
                <div key={report.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-luxury-brass/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-lg">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-luxury-slate dark:text-luxury-ivory">{report.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1">
                        <span className="font-semibold text-luxury-brass">{report.type}</span>
                        <span>•</span>
                        <span>{report.date}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-luxury-brass/30 text-luxury-slate dark:text-luxury-ivory rounded hover:bg-luxury-brass/10 transition-colors text-sm font-semibold">
                    <DownloadCloud className="w-4 h-4" /> Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
