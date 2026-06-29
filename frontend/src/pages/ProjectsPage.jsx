import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firestore';
import { FolderKanban, Calendar, User, DollarSign, CheckCircle2, Circle, Clock, ChevronRight } from 'lucide-react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const loaded = [];
      querySnapshot.forEach(doc => {
        loaded.push({ id: doc.id, ...doc.data() });
      });
      setProjects(loaded);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setToast({ type: 'error', message: 'Failed to fetch projects database.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleMilestoneToggle = async (projectId, milestoneIndex) => {
    try {
      const project = projects.find(p => p.id === projectId);
      if (!project) return;

      const updatedMilestones = [...project.milestones];
      const currentStatus = updatedMilestones[milestoneIndex].status;
      
      let nextStatus = 'Pending';
      if (currentStatus === 'Pending') nextStatus = 'In Progress';
      else if (currentStatus === 'In Progress') nextStatus = 'Completed';

      updatedMilestones[milestoneIndex].status = nextStatus;

      // Recalculate progress based on milestones
      const completedCount = updatedMilestones.filter(m => m.status === 'Completed').length;
      const inProgressCount = updatedMilestones.filter(m => m.status === 'In Progress').length;
      const calculatedProgress = Math.round(((completedCount + inProgressCount * 0.5) / updatedMilestones.length) * 100);

      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, {
        milestones: updatedMilestones,
        progress: calculatedProgress
      });

      // Update locally
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, milestones: updatedMilestones, progress: calculatedProgress } : p));
      setToast({ type: 'success', message: 'Milestone updated successfully!' });
    } catch (err) {
      console.error('Error updating milestone:', err);
      setToast({ type: 'error', message: 'Failed to update milestone.' });
    }
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.type === filter);

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
                <FolderKanban className="text-luxury-brass w-8 h-8" /> Fit-Out Projects
              </h1>
              <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1 font-light">
                Monitor active sites, interior design milestones, and turnkey handovers.
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 bg-luxury-ivory dark:bg-luxury-charcoal p-1 rounded-lg border border-luxury-brass/15">
              {['All', 'Restaurant', 'Hotel', 'Cafe'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-300 ${
                    filter === tab
                      ? 'bg-luxury-brass text-luxury-dark shadow-sm'
                      : 'text-luxury-slate/70 dark:text-luxury-ivory/70 hover:text-luxury-brass'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 border-4 border-luxury-brass border-t-transparent animate-spin rounded-full"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 rounded-xl p-12 text-center">
              <FolderKanban className="w-12 h-12 text-luxury-brass/40 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-serif font-semibold text-luxury-slate dark:text-luxury-ivory">No projects found</h3>
              <p className="text-sm text-luxury-slate/50 dark:text-luxury-ivory/50 mt-1">There are no active projects under the "{filter}" category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map(proj => (
                <div 
                  key={proj.id}
                  className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 hover:border-luxury-brass/25 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Project Header */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-brass bg-luxury-brass/5 px-2.5 py-1 rounded-full border border-luxury-brass/15">
                          {proj.type} Project
                        </span>
                        <h3 className="text-xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mt-3">
                          {proj.name}
                        </h3>
                        <p className="text-xs text-luxury-slate/50 dark:text-luxury-ivory/50 mt-0.5">
                          Client: {proj.client}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-luxury-brass font-serif">
                        {proj.progress}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-luxury-cream dark:bg-luxury-dark h-2 rounded-full overflow-hidden mb-6 border border-luxury-brass/5">
                      <div 
                        className="bg-gradient-to-r from-luxury-brass to-luxury-gold h-full transition-all duration-500" 
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-xs border-y border-luxury-brass/10 py-4">
                      <div className="flex items-center gap-2 text-luxury-slate/60 dark:text-luxury-ivory/60">
                        <User className="w-4 h-4 text-luxury-brass/70 shrink-0" />
                        <span>Designer: <strong>{proj.designer}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-luxury-slate/60 dark:text-luxury-ivory/60">
                        <DollarSign className="w-4 h-4 text-luxury-brass/70 shrink-0" />
                        <span>Budget: <strong>{proj.budget}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-luxury-slate/60 dark:text-luxury-ivory/60">
                        <Calendar className="w-4 h-4 text-luxury-brass/70 shrink-0" />
                        <span>Start: <strong>{proj.startDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-luxury-slate/60 dark:text-luxury-ivory/60">
                        <Calendar className="w-4 h-4 text-luxury-brass/70 shrink-0" />
                        <span>Est Handover: <strong>{proj.endDate}</strong></span>
                      </div>
                    </div>

                    {/* Milestones list */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-luxury-brass mb-3">Milestone Progress</h4>
                      <div className="space-y-2">
                        {proj.milestones.map((m, idx) => (
                          <div 
                            key={idx}
                            onClick={() => handleMilestoneToggle(proj.id, idx)}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-luxury-cream/40 dark:bg-luxury-dark/40 hover:bg-luxury-brass/5 border border-transparent hover:border-luxury-brass/10 cursor-pointer transition-all duration-300"
                          >
                            <span className="text-xs font-light text-luxury-slate dark:text-luxury-ivory">{m.name}</span>
                            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider">
                              {m.status === 'Completed' && (
                                <span className="text-emerald-500 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                                </span>
                              )}
                              {m.status === 'In Progress' && (
                                <span className="text-amber-500 flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 animate-spin" /> In Progress
                                </span>
                              )}
                              {m.status === 'Pending' && (
                                <span className="text-luxury-slate/40 dark:text-luxury-ivory/40 flex items-center gap-1">
                                  <Circle className="w-3.5 h-3.5" /> Pending
                                </span>
                              )}
                              <ChevronRight className="w-3.5 h-3.5 text-luxury-brass/45" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
