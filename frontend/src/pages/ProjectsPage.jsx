import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firestore';
import { FolderKanban, Clock, MapPin, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, 'leads'),
          where('status', 'in', ['Project Started', 'Design Approval', 'Completed'])
        );
        const querySnapshot = await getDocs(q);
        const loadedProjects = [];
        querySnapshot.forEach((doc) => {
          loadedProjects.push({ _id: doc.id, ...doc.data() });
        });
        setProjects(loadedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-luxury-cream dark:bg-luxury-dark transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory">
                Active Projects
              </h1>
              <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1">
                Monitor and manage ongoing fit-outs and designs
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="h-10 w-10 border-4 border-luxury-brass border-t-transparent animate-spin rounded-full"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 py-16 text-center rounded-xl">
              <FolderKanban className="w-12 h-12 text-luxury-brass/50 mx-auto mb-4" />
              <p className="text-luxury-slate/50 dark:text-luxury-ivory/50">
                No active projects found. Convert a lead to 'Project Started' to see it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-xl hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 rounded-full border text-xs font-semibold tracking-wide bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800">
                      {project.status}
                    </span>
                    <span className="text-xs text-luxury-brass font-bold uppercase tracking-wider">{project.projectType}</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-2">
                    {project.name}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-luxury-slate/70 dark:text-luxury-ivory/70">
                      <Building className="w-4 h-4 text-luxury-brass/65 shrink-0" />
                      <span className="truncate">{project.company || 'Private Client'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-luxury-slate/70 dark:text-luxury-ivory/70">
                      <MapPin className="w-4 h-4 text-luxury-brass/65 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-luxury-slate/70 dark:text-luxury-ivory/70">
                      <Clock className="w-4 h-4 text-luxury-brass/65 shrink-0" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                  <Link
                    to={`/leads/${project._id}`}
                    className="block text-center w-full py-2 bg-luxury-brass/10 text-luxury-gold font-semibold rounded hover:bg-luxury-brass/20 transition-colors text-sm"
                  >
                    View Project Details
                  </Link>
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
