import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { Users, Search, Phone, Star, Briefcase, UserPlus, X } from 'lucide-react';

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    trade: '',
    contact: '',
    rating: '5.0',
    activeProjects: '0',
    status: 'Available'
  });

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'vendors'));
      const loaded = [];
      querySnapshot.forEach(doc => {
        loaded.push({ id: doc.id, ...doc.data() });
      });
      setVendors(loaded);
    } catch (err) {
      console.error('Error fetching vendors:', err);
      setToast({ type: 'error', message: 'Failed to retrieve contractors directory.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVendor = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.trade.trim() || !formData.contact.trim()) {
      setToast({ type: 'error', message: 'Please fill in all mandatory fields.' });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'vendors'), {
        ...formData,
        rating: Number(formData.rating) || 5.0,
        activeProjects: Number(formData.activeProjects) || 0,
        createdAt: new Date().toISOString()
      });
      
      const newVendor = { 
        id: docRef.id, 
        ...formData, 
        rating: Number(formData.rating) || 5.0,
        activeProjects: Number(formData.activeProjects) || 0 
      };
      setVendors(prev => [newVendor, ...prev]);
      setIsModalOpen(false);
      setFormData({
        name: '',
        trade: '',
        contact: '',
        rating: '5.0',
        activeProjects: '0',
        status: 'Available'
      });
      setToast({ type: 'success', message: 'Contractor details added to directory!' });
    } catch (err) {
      console.error('Error adding vendor:', err);
      setToast({ type: 'error', message: 'Failed to save contractor details.' });
    }
  };

  const filteredVendors = vendors.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.trade.toLowerCase().includes(search.toLowerCase())
  );

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
                <Users className="text-luxury-brass w-8 h-8" /> Contractors & Vendors
              </h1>
              <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1 font-light">
                Directory of verified structural, carpentry, acoustic, and MEP contracting partners.
              </p>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold text-sm rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
            >
              <UserPlus className="w-4.5 h-4.5" /> Add Contractor
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3.5 h-4.5 w-4.5 text-luxury-brass/50" />
            <input
              type="text"
              placeholder="Search contractors by company name or trade speciality..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/20 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass"
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 border-4 border-luxury-brass border-t-transparent animate-spin rounded-full"></div>
            </div>
          ) : filteredVendors.length === 0 ? (
            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 rounded-xl p-12 text-center">
              <Users className="w-12 h-12 text-luxury-brass/40 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-serif font-semibold text-luxury-slate dark:text-luxury-ivory">No contractors found</h3>
              <p className="text-sm text-luxury-slate/50 dark:text-luxury-ivory/50 mt-1">Try searching for other keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map(vend => (
                <div 
                  key={vend.id}
                  className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 hover:border-luxury-brass/25 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Trade and Status */}
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-luxury-brass bg-luxury-brass/5 px-2.5 py-1 rounded border border-luxury-brass/15">
                        {vend.trade}
                      </span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        vend.status === 'Available' 
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}>
                        {vend.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-luxury-slate dark:text-luxury-ivory mt-4 mb-2">
                      {vend.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 mb-6">
                      <Phone className="w-3.5 h-3.5 text-luxury-brass/70 shrink-0" />
                      <span>{vend.contact}</span>
                    </div>

                    {/* Footer stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-luxury-brass/10 text-xs">
                      <div className="flex items-center gap-1 text-luxury-slate/60 dark:text-luxury-ivory/60">
                        <Star className="w-4.5 h-4.5 text-amber-400 fill-current shrink-0" />
                        <span>Rating: <strong>{vend.rating}</strong></span>
                      </div>
                      <div className="flex items-center gap-1 text-luxury-slate/60 dark:text-luxury-ivory/60">
                        <Briefcase className="w-4.5 h-4.5 text-luxury-brass/80 shrink-0" />
                        <span>Active Projects: <strong>{vend.activeProjects}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Vendor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-luxury-dark/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/15 max-w-md w-full rounded-2xl p-6 shadow-2xl relative animate-scale-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-luxury-slate/60 dark:text-luxury-ivory/60 hover:text-luxury-brass"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-2">Add Contractor Profile</h3>
            <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 mb-6">Add a verified exterior/interior contracting company to the portal.</p>

            <form onSubmit={handleAddVendor} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Company Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Elegant Carpentry Labs"
                  className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Trade / Speciality *</label>
                <input
                  type="text"
                  name="trade"
                  required
                  value={formData.trade}
                  onChange={handleInputChange}
                  placeholder="e.g. Masonry, Electrical, Civil Work"
                  className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Contact Details *</label>
                <input
                  type="text"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="e.g. Ramesh Kumar (+91 98450 11223)"
                  className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Rating (0 - 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    placeholder="5.0"
                    className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  >
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.01] mt-4"
              >
                Add Contractor
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorsPage;
