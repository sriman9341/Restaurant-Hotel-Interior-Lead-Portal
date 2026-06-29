import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firestore';
import { FileText, Download, TrendingUp, DollarSign, Calendar, Landmark } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const leadsSnapshot = await getDocs(collection(db, 'leads'));
      const quotesSnapshot = await getDocs(collection(db, 'quotations'));
      
      const loadedLeads = [];
      leadsSnapshot.forEach(doc => {
        loadedLeads.push({ id: doc.id, ...doc.data() });
      });

      const loadedQuotes = [];
      quotesSnapshot.forEach(doc => {
        loadedQuotes.push({ id: doc.id, ...doc.data() });
      });

      setLeads(loadedLeads);
      setQuotations(loadedQuotes);
    } catch (err) {
      console.error('Error fetching report data:', err);
      setToast({ type: 'error', message: 'Failed to retrieve database reports.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  // Compute metrics
  const totalRevenue = quotations.reduce((sum, q) => sum + (q.total || 0), 0);
  const totalSubtotal = quotations.reduce((sum, q) => sum + (q.subtotal || 0), 0);
  const averageQuoteValue = quotations.length > 0 ? Math.round(totalRevenue / quotations.length) : 0;
  const leadConversionRate = leads.length > 0 
    ? Math.round((leads.filter(l => ['Proposal Sent', 'Converted', 'Contract Signed'].includes(l.status)).length / leads.length) * 100) 
    : 0;

  // Generate jsPDF business report
  const downloadPDFReport = () => {
    try {
      const doc = new jsPDF();
      
      // Document Title & Styling
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(191, 161, 95); // Luxury Gold color (#bfa15f)
      doc.text('GLORY SIMON INTERIORS', 14, 20);
      
      doc.setFontSize(14);
      doc.setTextColor(51, 65, 85);
      doc.text('Hospitality Interior Portal - Financial & Lead Report', 14, 28);
      
      // Divider line
      doc.setDrawColor(191, 161, 95);
      doc.setLineWidth(0.5);
      doc.line(14, 32, 196, 32);
      
      // Metadata
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 38);
      doc.text('Database Version: Mock DB (Local Storage Fallback v2)', 14, 43);
      
      // Key Business Metrics
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(51, 65, 85);
      doc.text('Executive Summary Metrics', 14, 55);
      
      const summaryHeaders = [['Key Indicator', 'Value']];
      const summaryData = [
        ['Total Hospitality Leads', `${leads.length}`],
        ['Lead Conversion Rate (sent/converted)', `${leadConversionRate}%`],
        ['Total Generated Quotations', `${quotations.length}`],
        ['Quotations Subtotal (Excl. GST)', `INR ${totalSubtotal.toLocaleString()}`],
        ['Total Quotation Revenue (Incl. GST)', `INR ${totalRevenue.toLocaleString()}`],
        ['Average Quotation Value', `INR ${averageQuoteValue.toLocaleString()}`]
      ];
      
      doc.autoTable({
        startY: 60,
        head: summaryHeaders,
        body: summaryData,
        theme: 'striped',
        headStyles: { fillColor: [191, 161, 95], textColor: [255, 255, 255] },
        styles: { fontSize: 10 }
      });
      
      // Lead Funnel Breakdown
      const currentY = doc.previousAutoTable.finalY + 15;
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Quotations Detail Summary', 14, currentY);
      
      const quoteHeaders = [['Quote ID', 'Client Name', 'Subtotal (INR)', 'Total (Incl GST)', 'Date']];
      const quoteRows = quotations.map(q => [
        q.id,
        q.leadName,
        q.subtotal.toLocaleString(),
        q.total.toLocaleString(),
        q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A'
      ]);
      
      doc.autoTable({
        startY: currentY + 5,
        head: quoteHeaders,
        body: quoteRows,
        theme: 'grid',
        headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255] },
        styles: { fontSize: 9 }
      });

      // Save document
      doc.save(`Glory_Simon_Interiors_Business_Report_${new Date().toISOString().slice(0,10)}.pdf`);
      setToast({ type: 'success', message: 'PDF Report downloaded successfully!' });
    } catch (err) {
      console.error('Error exporting PDF report:', err);
      setToast({ type: 'error', message: 'Failed to generate PDF Report.' });
    }
  };

  return (
    <div className="flex bg-luxury-cream dark:bg-luxury-dark min-h-[calc(100vh-80px)] transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory flex items-center gap-3">
                <FileText className="text-luxury-brass w-8 h-8" /> Business Reports
              </h1>
              <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1 font-light">
                Summarize leads, pipeline metrics, and download compiled PDF sales/operational statements.
              </p>
            </div>
            
            <button
              onClick={downloadPDFReport}
              disabled={loading || quotations.length === 0}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold text-sm rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.01] disabled:opacity-50"
            >
              <Download className="w-4.5 h-4.5" /> Export Executive PDF
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 border-4 border-luxury-brass border-t-transparent animate-spin rounded-full"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-luxury-brass font-bold block">Total pipeline val</span>
                    <span className="text-2xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory block mt-1">
                      ₹{(totalRevenue/100000).toFixed(1)} L
                    </span>
                  </div>
                  <DollarSign className="w-8 h-8 text-luxury-brass/40" />
                </div>
                
                <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-luxury-brass font-bold block">Average quotation</span>
                    <span className="text-2xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory block mt-1">
                      ₹{(averageQuoteValue/100000).toFixed(1)} L
                    </span>
                  </div>
                  <Landmark className="w-8 h-8 text-luxury-brass/40" />
                </div>

                <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-luxury-brass font-bold block">Conversion rate</span>
                    <span className="text-2xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory block mt-1">
                      {leadConversionRate}%
                    </span>
                  </div>
                  <TrendingUp className="w-8 h-8 text-luxury-brass/40" />
                </div>

                <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-luxury-brass font-bold block">Quotes generated</span>
                    <span className="text-2xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory block mt-1">
                      {quotations.length}
                    </span>
                  </div>
                  <FileText className="w-8 h-8 text-luxury-brass/40" />
                </div>
              </div>

              {/* Quotations Detail Table */}
              <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 rounded-2xl p-6">
                <h3 className="text-lg font-serif font-bold text-luxury-slate dark:text-luxury-ivory mb-6">
                  Quotation Submissions Log
                </h3>
                
                {quotations.length === 0 ? (
                  <div className="text-center py-10 text-sm text-luxury-slate/50 dark:text-luxury-ivory/50">
                    No quotation summaries recorded yet. Go to leads detail to generate one.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-luxury-brass/15 text-luxury-brass font-bold">
                          <th className="py-3 px-4">Quote ID</th>
                          <th className="py-3 px-4">Client / Lead</th>
                          <th className="py-3 px-4 text-right">Subtotal</th>
                          <th className="py-3 px-4 text-right">GST (18%)</th>
                          <th className="py-3 px-4 text-right">Total (Incl GST)</th>
                          <th className="py-3 px-4 text-right">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-luxury-brass/10 text-luxury-slate/85 dark:text-luxury-ivory/85">
                        {quotations.map(q => (
                          <tr key={q.id} className="hover:bg-luxury-brass/5 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-luxury-gold">{q.id}</td>
                            <td className="py-3.5 px-4 font-semibold">{q.leadName}</td>
                            <td className="py-3.5 px-4 text-right font-serif">₹{q.subtotal?.toLocaleString()}</td>
                            <td className="py-3.5 px-4 text-right font-serif">₹{q.gstAmount?.toLocaleString()}</td>
                            <td className="py-3.5 px-4 text-right font-serif font-bold">₹{q.total?.toLocaleString()}</td>
                            <td className="py-3.5 px-4 text-right">
                              <span className="flex items-center justify-end gap-1.5 text-luxury-slate/50 dark:text-luxury-ivory/50 text-[10px]">
                                <Calendar className="w-3.5 h-3.5 shrink-0" />
                                {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
