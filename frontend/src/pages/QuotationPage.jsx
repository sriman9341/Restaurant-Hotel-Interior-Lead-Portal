import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import { ChevronLeft, Save, Download, Calculator, Percent } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, serverTimestamp, addDoc } from 'firebase/firestore';
import { db } from '../firestore';
import 'jspdf-autotable';

const QuotationPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [designCost, setDesignCost] = useState('0');
  const [furnitureCost, setFurnitureCost] = useState('0');
  const [lightingCost, setLightingCost] = useState('0');
  const [flooringCost, setFlooringCost] = useState('0');
  const [civilWorkCost, setCivilWorkCost] = useState('0');
  const [miscellaneousCost, setMiscellaneousCost] = useState('0');

  useEffect(() => {
    const fetchLeadAndQuotation = async () => {
      setLoading(true);
      try {
        
        const leadDocRef = doc(db, 'leads', id);
        const leadSnap = await getDoc(leadDocRef);
        
        if (leadSnap.exists()) {
          setLead({ _id: leadSnap.id, ...leadSnap.data() });
        }

        try {
          const q = query(collection(db, 'quotations'), where('leadId', '==', id));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const qData = querySnapshot.docs[0].data();
            setDesignCost(String(qData.designCost));
            setFurnitureCost(String(qData.furnitureCost));
            setLightingCost(String(qData.lightingCost));
            setFlooringCost(String(qData.flooringCost));
            setCivilWorkCost(String(qData.civilWorkCost));
            setMiscellaneousCost(String(qData.miscellaneousCost));
          }
        } catch (qErr) {
          console.error('Error fetching quotation for lead:', qErr);
          // It's acceptable for a lead to not have a quotation yet; show no toast.
        }
      } catch (err) {
        console.error('Error loading lead details — full error:', err);
        const msg = err?.message || 'Unknown error';
        const code = err?.code ? ` (${err.code})` : '';
        setToast({ type: 'error', message: `Error loading lead details: ${msg}${code}` });
      } finally {
        setLoading(false);
      }
    };

    fetchLeadAndQuotation();
  }, [id]);

  const dCost = Number(designCost) || 0;
  const fCost = Number(furnitureCost) || 0;
  const lCost = Number(lightingCost) || 0;
  const flCost = Number(flooringCost) || 0;
  const cCost = Number(civilWorkCost) || 0;
  const mCost = Number(miscellaneousCost) || 0;

  const subtotal = dCost + fCost + lCost + flCost + cCost + mCost;
  const gst = Math.round(subtotal * 0.18 * 100) / 100;
  const total = subtotal + gst;

  const handleSaveQuotation = async () => {
    setSaveLoading(true);
    try {
      
      const payload = {
        leadId: id,
        designCost: dCost,
        furnitureCost: fCost,
        lightingCost: lCost,
        flooringCost: flCost,
        civilWorkCost: cCost,
        miscellaneousCost: mCost,
        subtotal,
        gst,
        total,
        createdAt: serverTimestamp()
      };

      const q = query(collection(db, 'quotations'), where('leadId', '==', id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Update existing quotation
        const qDocId = querySnapshot.docs[0].id;
        await updateDoc(doc(db, 'quotations', qDocId), {
          ...payload,
          createdAt: querySnapshot.docs[0].data().createdAt
        });
      } else {
        // Add new quotation
        await addDoc(collection(db, 'quotations'), payload);
      }
      
      // Update Lead status to 'Quotation Sent' if not already
      if (lead && lead.status !== 'Quotation Sent') {
        await updateDoc(doc(db, 'leads', id), {
          status: 'Quotation Sent',
          updatedAt: serverTimestamp()
        });
        setLead(prev => ({ ...prev, status: 'Quotation Sent' }));
      }
      
      setToast({ type: 'success', message: 'Quotation saved successfully! Lead updated.' });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: 'Failed to save quotation.' });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!lead) return;

    const doc = new jsPDF();
    const primaryColor = [30, 41, 59];
    const goldAccent = [197, 168, 128];

    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('GLORY SIMON INTERIORS', 20, 20);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...goldAccent);
    doc.text('Luxury Restaurant & Hotel Interior Architectures', 20, 27);

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`Quotation ID: QUOTE-${lead._id.substring(0, 8).toUpperCase()}`, 130, 20);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 130, 27);

    doc.setFillColor(248, 250, 252);
    doc.rect(20, 50, 170, 35, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(20, 50, 170, 35, 'S');

    doc.setTextColor(71, 85, 105);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Prepared For:', 25, 58);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Client Name: ${lead.name}`, 25, 65);
    doc.text(`Company: ${lead.company || 'Private Client'}`, 25, 71);
    doc.text(`Location: ${lead.location}`, 25, 77);

    doc.text(`Space Type: ${lead.projectType}`, 115, 65);
    doc.text(`Carpet Area: ${lead.area} Sq Ft`, 115, 71);
    doc.text(`Timeline: ${lead.timeline}`, 115, 77);

    const tableHeaders = [['Project Phase / Components', 'Cost (INR ₹)']];
    const tableRows = [
      ['Design, Space Planning & Custom Walkthroughs', `Rs. ${dCost.toLocaleString('en-IN')}`],
      ['Bespoke Furniture, Seating & Counters Fit-out', `Rs. ${fCost.toLocaleString('en-IN')}`],
      ['Mood Lighting, Custom Chandeliers & Conduit Layouts', `Rs. ${lCost.toLocaleString('en-IN')}`],
      ['Premium Flooring, Stone Carving & Carpeting', `Rs. ${flCost.toLocaleString('en-IN')}`],
      ['Civil Structure Modifications & MEP Work', `Rs. ${cCost.toLocaleString('en-IN')}`],
      ['Miscellaneous Costs (Shipping, Clearances, Scaffolds)', `Rs. ${mCost.toLocaleString('en-IN')}`]
    ];

    doc.autoTable({
      startY: 95,
      head: tableHeaders,
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [51, 65, 85]
      },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 50, halign: 'right' }
      },
      margin: { left: 20, right: 20 }
    });

    const finalY = doc.previousAutoTable.finalY + 10;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text('Subtotal:', 120, finalY);
    doc.text(`Rs. ${subtotal.toLocaleString('en-IN')}`, 190, finalY, { align: 'right' });

    doc.text('GST (18%):', 120, finalY + 6);
    doc.text(`Rs. ${gst.toLocaleString('en-IN')}`, 190, finalY + 6, { align: 'right' });

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text('Grand Total:', 120, finalY + 14);
    doc.text(`Rs. ${total.toLocaleString('en-IN')}`, 190, finalY + 14, { align: 'right' });

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Terms & Conditions:', 20, finalY + 30);
    doc.text('1. Validity: This quotation is valid for 30 days from date of generation.', 20, finalY + 35);
    doc.text(
      '2. Payments: 50% mobilization advance, 30% on fabrication milestone, 20% on handover.',
      20,
      finalY + 39
    );
    doc.text(
      '3. Customizations: Any changes to approved drawings will be charged extra.',
      20,
      finalY + 43
    );

    doc.save(`Glory_Simon_Quotation_${lead.name.replace(/\s+/g, '_')}.pdf`);
    setToast({ type: 'success', message: 'PDF generated & downloaded!' });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-luxury-cream dark:bg-luxury-dark">
        <div className="h-10 w-10 border-4 border-luxury-brass border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-luxury-cream dark:bg-luxury-dark min-h-[calc(100vh-80px)] transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Link
              to={`/leads/${id}`}
              className="flex items-center gap-1 text-xs font-semibold text-luxury-gold hover:text-luxury-brass transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Lead Details
            </Link>
            <div className="flex gap-3">
              <button
                onClick={handleSaveQuotation}
                disabled={saveLoading}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-luxury-brass text-luxury-brass hover:bg-luxury-brass/5 rounded-lg text-xs font-bold transition-all disabled:opacity-40"
              >
                <Save className="w-4 h-4" /> {saveLoading ? 'Saving...' : 'Save Estimate'}
              </button>
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark dark:text-luxury-dark font-bold rounded-lg hover:shadow text-xs"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>

          {lead && (
            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-5 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-luxury-brass uppercase tracking-widest">
                Pricing Calculator Brief
              </span>
              <h2 className="text-xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory">
                {lead.name}
              </h2>
              <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60">
                Segment: {lead.projectType} • Scope: {lead.area} Sq Ft • Location: {lead.location}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-2xl space-y-5">
              <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-brass border-b border-luxury-brass/10 pb-3">
                Phase Cost Breakdown
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-1.5">
                    Design & Architectural Drawings (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={designCost}
                    min="0"
                    onChange={(e) => setDesignCost(e.target.value)}
                    className="block w-full px-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-1.5">
                    Bespoke Furniture & Fit-out (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={furnitureCost}
                    min="0"
                    onChange={(e) => setFurnitureCost(e.target.value)}
                    className="block w-full px-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-1.5">
                    Lighting & Lighting Conduits (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={lightingCost}
                    min="0"
                    onChange={(e) => setLightingCost(e.target.value)}
                    className="block w-full px-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-1.5">
                    Stone Flooring & Carpeting (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={flooringCost}
                    min="0"
                    onChange={(e) => setFlooringCost(e.target.value)}
                    className="block w-full px-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-1.5">
                    Civil Structure & MEP work (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={civilWorkCost}
                    min="0"
                    onChange={(e) => setCivilWorkCost(e.target.value)}
                    className="block w-full px-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-1.5">
                    Miscellaneous & Logistics (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={miscellaneousCost}
                    min="0"
                    onChange={(e) => setMiscellaneousCost(e.target.value)}
                    className="block w-full px-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/15 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-brass border-b border-luxury-brass/10 pb-3 mb-6">
                  Quotation Pricing Summary
                </h3>

                <div className="space-y-4 text-sm font-semibold">
                  <div className="flex justify-between items-center text-luxury-slate/60 dark:text-luxury-ivory/60">
                    <span>Subtotal:</span>
                    <span>₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-luxury-slate/60 dark:text-luxury-ivory/60">
                    <span className="flex items-center gap-1">
                      GST (18%): <Percent className="w-3.5 h-3.5" />
                    </span>
                    <span>₹ {gst.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="pt-4 border-t border-luxury-brass/20 flex justify-between items-center text-lg font-bold">
                    <span className="text-luxury-slate dark:text-luxury-ivory">Grand Total:</span>
                    <span className="text-luxury-gold font-serif">
                      ₹ {total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-luxury-brass/5 border border-luxury-brass/20 p-4 rounded-xl text-xs text-luxury-brass/80 space-y-1 mt-6">
                <p className="font-bold uppercase tracking-wider flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5" /> Operations Advice
                </p>
                <p>
                  Ensure you save the quotation configuration before exporting the client PDF. Saving
                  the quotation updates the lead pipeline status to 'Quotation Sent' automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default QuotationPage;
