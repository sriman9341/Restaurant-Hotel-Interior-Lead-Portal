import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firestore';

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        
        const leadsSnapshot = await getDocs(collection(db, 'leads'));
        
        const projectTypeCounts = {};
        const statusCounts = {};
        const budgetCounts = {};
        const monthCounts = {};
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        leadsSnapshot.forEach(doc => {
          const lead = doc.data();
          
          if (lead.projectType) {
            projectTypeCounts[lead.projectType] = (projectTypeCounts[lead.projectType] || 0) + 1;
          }
          if (lead.status) {
            statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
          }
          if (lead.budget) {
            budgetCounts[lead.budget] = (budgetCounts[lead.budget] || 0) + 1;
          }
          if (lead.createdAt) {
            const date = lead.createdAt?.toDate ? lead.createdAt.toDate() : new Date(lead.createdAt);
            const monthStr = monthNames[date.getMonth()];
            monthCounts[monthStr] = (monthCounts[monthStr] || 0) + 1;
          }
        });

        const projectTypes = Object.entries(projectTypeCounts).map(([name, value]) => ({ name, value }));
        const statuses = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
        const budgets = Object.entries(budgetCounts).map(([name, value]) => ({ name, value }));
        
        // Map months in order
        const monthlyGrowth = monthNames.filter(m => monthCounts[m] !== undefined).map(name => ({
          name,
          Leads: monthCounts[name]
        }));
        
        setData({
          projectTypes,
          monthlyGrowth,
          statuses,
          budgets
        });
        
      } catch (err) {
        console.error(err);
        setToast({ type: 'error', message: 'Failed to fetch analytics charts' });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const COLORS = ['#c5a880', '#d4af37', '#1e293b', '#475569', '#8b5cf6', '#10b981'];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-luxury-cream dark:bg-luxury-dark">
        <div className="h-10 w-10 border-4 border-luxury-brass border-t-transparent animate-spin rounded-full font-bold"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-luxury-cream dark:bg-luxury-dark min-h-[calc(100vh-80px)] transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory font-semibold">
              Pipeline Analytics
            </h1>
            <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60">
              Real-time analytics for project segments, acquisition growth, and workflow stage capacity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-2xl">
              <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-brass mb-4">
                Hospitality Segment Allocation
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.projectTypes || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {data?.projectTypes?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: '#1c1c1e',
                        border: '1px solid #c5a880',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-2xl">
              <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-brass mb-4">
                Lead Acquisition Growth
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data?.monthlyGrowth || []}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" stroke="#c5a880" fontSize={10} />
                    <YAxis stroke="#c5a880" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        background: '#1c1c1e',
                        border: '1px solid #c5a880',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="Leads"
                      stroke="#d4af37"
                      fillOpacity={1}
                      fill="url(#colorLeads)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-2xl">
              <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-brass mb-4">
                Workflow Stage Capacity
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.statuses || []}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" stroke="#c5a880" fontSize={10} />
                    <YAxis stroke="#c5a880" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        background: '#1c1c1e',
                        border: '1px solid #c5a880',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Bar dataKey="value" fill="#c5a880" radius={[4, 4, 0, 0]}>
                      {data?.statuses?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-2xl">
              <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-brass mb-4">
                Budget Distribution Share
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data?.budgets || []} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                      {data?.budgets?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: '#1c1c1e',
                        border: '1px solid #c5a880',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
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

export default AnalyticsPage;
