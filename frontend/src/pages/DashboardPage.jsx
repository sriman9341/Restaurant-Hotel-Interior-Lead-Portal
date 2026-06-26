import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import LeadCard from '../components/LeadCard';
import Toast from '../components/Toast';
import { Layers, Search, Filter, RefreshCw, ChevronLeft, ChevronRight, FileSpreadsheet, PlusCircle } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [sort, setSort] = useState('-createdAt');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const res = await api.get('/api/dashboard/stats');
      if (res.data && res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err.message);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 8,
        sort,
        search: search.trim() || undefined,
        status: statusFilter || undefined,
        projectType: typeFilter || undefined,
        budget: budgetFilter || undefined
      };

      const res = await api.get('/api/leads', { params });
      if (res.data && res.data.success) {
        setLeads(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalLeads(res.data.totalLeads);
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to retrieve leads list.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [search, statusFilter, typeFilter, budgetFilter, sort, page]);

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('');
    setTypeFilter('');
    setBudgetFilter('');
    setSort('-createdAt');
    setPage(1);
  };

  return (
    <div className="flex bg-luxury-cream dark:bg-luxury-dark min-h-[calc(100vh-80px)] transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory">
                Workspace Dashboard
              </h1>
              <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60">
                Hospitality Interior leads flow & design pipelines management
              </p>
            </div>
            <Link
              to="/enquire"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark dark:text-luxury-dark font-bold rounded-lg hover:shadow transition-all text-sm self-start sm:self-center"
            >
              <PlusCircle className="w-4 h-4" /> Log Custom Enquiry
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              title="Total Leads"
              value={statsLoading ? '...' : stats?.totalLeads || 0}
              icon={Layers}
              description="Total consultations logged"
            />
            <StatCard
              title="Pipeline Value"
              value={statsLoading ? '...' : `₹${stats ? Math.round(stats.totalQuotationVal / 100000) : 0} Lakhs`}
              icon={FileSpreadsheet}
              description="Sum of all saved quotes"
            />
            <StatCard
              title="Avg Area Size"
              value={statsLoading ? '...' : `${stats?.avgArea || 0} SqFt`}
              description="Average project scope"
            />
            <StatCard
              title="Avg Capacity"
              value={statsLoading ? '...' : `${stats?.avgCapacity || 0} Pax`}
              description="Average seating volume"
            />
          </div>

          <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-5 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-luxury-brass font-semibold text-sm border-b border-luxury-brass/10 pb-3">
              <Filter className="w-4 h-4" /> Filters & Controls
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-luxury-brass/50">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search name, company..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="block w-full pl-9 pr-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass text-xs"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="block w-full px-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass text-xs"
              >
                <option value="">All Statuses</option>
                <option value="New Lead">New Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                <option value="Requirement Gathering">Requirement Gathering</option>
                <option value="Quotation Sent">Quotation Sent</option>
                <option value="Design Approval">Design Approval</option>
                <option value="Project Started">Project Started</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setPage(1);
                }}
                className="block w-full px-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass text-xs"
              >
                <option value="">All Segments</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Hotel">Hotel</option>
                <option value="Cafe">Cafe</option>
                <option value="Resort">Resort</option>
                <option value="Banquet Hall">Banquet Hall</option>
              </select>

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="block w-full px-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass text-xs"
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="-area">Area Size (High to Low)</option>
                <option value="area">Area Size (Low to High)</option>
                <option value="-seatingCapacity">Capacity (High to Low)</option>
              </select>
            </div>

            <div className="flex justify-between items-center pt-2 text-xs">
              <span className="text-luxury-slate/50 dark:text-luxury-ivory/50 font-medium">
                Found {totalLeads} matching leads
              </span>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-luxury-gold hover:text-luxury-brass font-semibold transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Clear Filters
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="h-10 w-10 border-4 border-luxury-brass border-t-transparent animate-spin rounded-full"></div>
            </div>
          ) : leads.length === 0 ? (
            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 py-16 text-center rounded-xl">
              <p className="text-luxury-slate/50 dark:text-luxury-ivory/50">
                No enquiries match the current filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="text-luxury-gold hover:text-luxury-brass font-bold text-xs mt-2 underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {leads.map((lead) => (
                <LeadCard key={lead._id} lead={lead} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="p-2 border border-luxury-brass/20 rounded-lg hover:bg-luxury-brass/5 disabled:opacity-30 disabled:hover:bg-transparent text-luxury-slate dark:text-luxury-ivory"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="p-2 border border-luxury-brass/20 rounded-lg hover:bg-luxury-brass/5 disabled:opacity-30 disabled:hover:bg-transparent text-luxury-slate dark:text-luxury-ivory"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </main>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default DashboardPage;
