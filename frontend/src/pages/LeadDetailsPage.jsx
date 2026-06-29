import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import { ChevronLeft, FilePlus, Send } from 'lucide-react';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { db } from '../firestore';

const LeadDetailsPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [noteSubmitLoading, setNoteSubmitLoading] = useState(false);
  const [hasQuotation, setHasQuotation] = useState(false);

  const workflowStages = [
    'New Lead',
    'Contacted',
    'Site Visit Scheduled',
    'Requirement Gathering',
    'Quotation Sent',
    'Design Approval',
    'Project Started',
    'Completed'
  ];

  const fetchLeadDetails = async () => {
    setLoading(true);
    try {
      
      const docRef = doc(db, 'leads', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLead({
          _id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        });
      } else {
        setLead(null);
      }
    } catch (err) {
      console.error('Failed to fetch lead specifications — full error:', err);
      const msg = err?.message || 'Unknown error';
      const code = err?.code ? ` (${err.code})` : '';
      setToast({ type: 'error', message: `Failed to fetch lead specifications: ${msg}${code}` });
    } finally {
      setLoading(false);
    }
  };

  const checkQuotation = async () => {
    try {
      
      const q = query(collection(db, 'quotations'), where('leadId', '==', id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setHasQuotation(true);
      } else {
        setHasQuotation(false);
      }
    } catch (err) {
      console.error('Error checking quotations for lead:', err);
      setHasQuotation(false);
    }
  };

  useEffect(() => {
    fetchLeadDetails();
    checkQuotation();
  }, [id]);

  const handleUpdateStatus = async (status) => {
    try {
      
      const docRef = doc(db, 'leads', id);
      await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
      
      setLead((prev) => ({ ...prev, status }));
      setToast({ type: 'success', message: `Status updated to: ${status}` });
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to update workflow status' });
    }
  };

  const handleUpdateOwner = async (owner) => {
    try {
      
      const docRef = doc(db, 'leads', id);
      await updateDoc(docRef, { owner, updatedAt: serverTimestamp() });
      
      setLead((prev) => ({ ...prev, owner }));
      setToast({ type: 'success', message: `Assigned owner to: ${owner}` });
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to assign owner' });
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setNoteSubmitLoading(true);
    try {
      const newNoteObj = {
        text: newNote,
        date: new Date().toISOString(),
        author: 'Admin'
      };
      
      const docRef = doc(db, 'leads', id);
      await updateDoc(docRef, {
        internalNotes: arrayUnion(newNoteObj)
      });
      
      setLead((prev) => ({ ...prev, internalNotes: [...(prev.internalNotes || []), newNoteObj] }));
      setNewNote('');
      setToast({ type: 'success', message: 'Note added successfully' });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: 'Failed to save internal note' });
    } finally {
      setNoteSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-luxury-cream dark:bg-luxury-dark">
        <div className="h-10 w-10 border-4 border-luxury-brass border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-luxury-cream dark:bg-luxury-dark">
        <div className="text-center">
          <p className="text-luxury-slate/50 dark:text-luxury-ivory/50">
            Lead specifications not found.
          </p>
          <Link to="/dashboard" className="text-luxury-gold underline font-bold mt-2 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentStageIndex = workflowStages.indexOf(lead.status);

  return (
    <div className="flex bg-luxury-cream dark:bg-luxury-dark min-h-[calc(100vh-80px)] transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <Link
              to="/dashboard"
              className="flex items-center gap-1 text-xs font-semibold text-luxury-gold hover:text-luxury-brass transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to List
            </Link>
            <Link
              to={`/leads/${lead._id}/quotation`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark dark:text-luxury-dark font-bold rounded-lg hover:shadow text-xs"
            >
              <FilePlus className="w-4 h-4" />{' '}
              {hasQuotation ? 'Update Quotation' : 'Create Quotation'}
            </Link>
          </div>

          <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-luxury-brass uppercase tracking-wider">
                {lead.projectType} Project Brief
              </span>
              <h1 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mt-1 font-semibold">
                {lead.name}
              </h1>
              <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1">
                {lead.company || 'Private Consultation'} • {lead.location}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-luxury-slate/50 dark:text-luxury-ivory/50 uppercase tracking-widest shrink-0">
                Assigned Owner:
              </label>
              <select
                value={lead.owner}
                onChange={(e) => handleUpdateOwner(e.target.value)}
                className="px-3 py-1.5 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory text-xs font-bold focus:outline-none focus:border-luxury-brass"
              >
                <option value="Unassigned">Unassigned</option>
                <option value="Admin">Admin</option>
                <option value="Glory">Glory</option>
                <option value="Simon">Simon</option>
              </select>
            </div>
          </div>

          <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-2xl">
            <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-brass mb-6">
              Workflow Pipeline Progress
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 text-center">
              {workflowStages.map((stage, idx) => {
                const isCompleted = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <button
                    key={stage}
                    onClick={() => handleUpdateStatus(stage)}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs transition-all duration-300 mb-2 ${
                        isCurrent
                          ? 'bg-luxury-gold text-luxury-dark border-luxury-gold scale-110 shadow-lg'
                          : isCompleted
                          ? 'bg-luxury-brass/20 border-luxury-brass text-luxury-gold'
                          : 'bg-luxury-cream dark:bg-luxury-dark border-luxury-brass/15 text-luxury-slate/30 dark:text-luxury-ivory/30 group-hover:border-luxury-brass/50'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider leading-tight max-w-[80px] ${
                        isCurrent
                          ? 'text-luxury-gold'
                          : isCompleted
                          ? 'text-luxury-slate/85 dark:text-luxury-ivory/85 font-semibold'
                          : 'text-luxury-slate/40 dark:text-luxury-ivory/40 group-hover:text-luxury-brass'
                      }`}
                    >
                      {stage}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-2xl space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-brass border-b border-luxury-brass/10 pb-3">
                Project Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] text-luxury-slate/50 dark:text-luxury-ivory/50 uppercase tracking-widest font-semibold mb-1">
                      Mobile Contact
                    </span>
                    <span className="font-semibold text-luxury-slate dark:text-luxury-ivory">
                      {lead.mobile}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-luxury-slate/50 dark:text-luxury-ivory/50 uppercase tracking-widest font-semibold mb-1">
                      Email Contact
                    </span>
                    <span className="font-semibold text-luxury-slate dark:text-luxury-ivory">
                      {lead.email}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-luxury-slate/50 dark:text-luxury-ivory/50 uppercase tracking-widest font-semibold mb-1">
                      Budget Bracket
                    </span>
                    <span className="font-semibold text-luxury-gold">{lead.budget}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-luxury-slate/50 dark:text-luxury-ivory/50 uppercase tracking-widest font-semibold mb-1">
                      Timeline Range
                    </span>
                    <span className="font-semibold text-luxury-slate dark:text-luxury-ivory">
                      {lead.timeline}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] text-luxury-slate/50 dark:text-luxury-ivory/50 uppercase tracking-widest font-semibold mb-1">
                      Total Carpet Area
                    </span>
                    <span className="font-semibold text-luxury-slate dark:text-luxury-ivory">
                      {lead.area} Square Feet
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-luxury-slate/50 dark:text-luxury-ivory/50 uppercase tracking-widest font-semibold mb-1">
                      Seating Capacity
                    </span>
                    <span className="font-semibold text-luxury-slate dark:text-luxury-ivory">
                      {lead.seatingCapacity} Pax Seating
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-luxury-slate/50 dark:text-luxury-ivory/50 uppercase tracking-widest font-semibold mb-1">
                      Selected Theme Motif
                    </span>
                    <span className="font-semibold text-luxury-gold">{lead.theme}</span>
                  </div>
                </div>
              </div>

              <div className="bg-luxury-cream dark:bg-luxury-dark/40 border border-luxury-brass/10 p-4 rounded-xl space-y-3">
                <span className="block text-xs uppercase font-bold text-luxury-brass tracking-wider">
                  Core Layout Components Needed
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div
                    className={`flex items-center gap-2 font-semibold ${
                      lead.kitchenRequired
                        ? 'text-emerald-500'
                        : 'text-luxury-slate/30 dark:text-luxury-ivory/30'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        lead.kitchenRequired ? 'bg-emerald-500' : 'bg-luxury-slate/20'
                      }`}
                    ></span>
                    Commercial Kitchen
                  </div>
                  <div
                    className={`flex items-center gap-2 font-semibold ${
                      lead.barRequired
                        ? 'text-emerald-500'
                        : 'text-luxury-slate/30 dark:text-luxury-ivory/30'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        lead.barRequired ? 'bg-emerald-500' : 'bg-luxury-slate/20'
                      }`}
                    ></span>
                    Bar counter Lounge
                  </div>
                  <div
                    className={`flex items-center gap-2 font-semibold ${
                      lead.outdoorSeating
                        ? 'text-emerald-500'
                        : 'text-luxury-slate/30 dark:text-luxury-ivory/30'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        lead.outdoorSeating ? 'bg-emerald-500' : 'bg-luxury-slate/20'
                      }`}
                    ></span>
                    Alfresco dining Area
                  </div>
                </div>
              </div>

              <div>
                <span className="block text-[10px] text-luxury-slate/50 dark:text-luxury-ivory/50 uppercase tracking-widest font-semibold mb-2">
                  Original Brief Notes
                </span>
                <p className="bg-luxury-cream dark:bg-luxury-dark/30 border border-luxury-brass/5 p-4 rounded-xl text-sm leading-relaxed text-luxury-slate/85 dark:text-luxury-ivory/85 italic font-light">
                  {lead.notes || 'No description notes provided.'}
                </p>
              </div>
            </div>

            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-2xl flex flex-col justify-between h-[520px]">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-brass border-b border-luxury-brass/10 pb-3 mb-4">
                  Internal Notes Log
                </h3>

                <div className="space-y-4 overflow-y-auto max-h-[340px] pr-2 scrollbar-thin">
                  {lead.internalNotes.length === 0 ? (
                    <p className="text-xs text-center text-luxury-slate/40 dark:text-luxury-ivory/40 py-8">
                      No logs exist yet. Create one below.
                    </p>
                  ) : (
                    lead.internalNotes.map((note, noteIdx) => (
                      <div
                        key={noteIdx}
                        className="bg-luxury-cream dark:bg-luxury-dark/50 border border-luxury-brass/5 p-3.5 rounded-lg space-y-1.5"
                      >
                        <p className="text-xs text-luxury-slate/85 dark:text-luxury-ivory/85 leading-relaxed font-medium">
                          {note.text}
                        </p>
                        <div className="flex justify-between items-center text-[10px] text-luxury-slate/45 dark:text-luxury-ivory/45 font-semibold">
                          <span>{note.author}</span>
                          <span>{new Date(note.date).toLocaleString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <form onSubmit={handleAddNote} className="mt-4 pt-3 border-t border-luxury-brass/10 relative">
                <input
                  type="text"
                  placeholder="Type note log here..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 border border-luxury-brass/20 bg-luxury-cream dark:bg-luxury-dark rounded-lg text-xs text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass placeholder-luxury-slate/40 focus:ring-1 focus:ring-luxury-brass"
                />
                <button
                  type="submit"
                  disabled={noteSubmitLoading || !newNote.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-luxury-gold hover:text-luxury-brass transition-colors disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
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

export default LeadDetailsPage;
