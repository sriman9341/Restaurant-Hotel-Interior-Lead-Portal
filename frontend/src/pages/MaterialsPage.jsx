import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { Package, Search, Filter, Layers, DollarSign, Plus, X } from 'lucide-react';

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Flooring / Stone',
    rate: '',
    grade: '',
    stock: '',
    supplier: ''
  });

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'materials'));
      const loaded = [];
      querySnapshot.forEach(doc => {
        loaded.push({ id: doc.id, ...doc.data() });
      });
      setMaterials(loaded);
    } catch (err) {
      console.error('Error fetching materials:', err);
      setToast({ type: 'error', message: 'Failed to retrieve materials directory.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.rate.trim() || !formData.stock.trim()) {
      setToast({ type: 'error', message: 'Please fill in all mandatory fields.' });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'materials'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      
      const newMaterial = { id: docRef.id, ...formData };
      setMaterials(prev => [newMaterial, ...prev]);
      setIsModalOpen(false);
      setFormData({
        name: '',
        category: 'Flooring / Stone',
        rate: '',
        grade: '',
        stock: '',
        supplier: ''
      });
      setToast({ type: 'success', message: 'Material specifications added to catalogue!' });
    } catch (err) {
      console.error('Error adding material:', err);
      setToast({ type: 'error', message: 'Failed to save material specs.' });
    }
  };

  const filteredMaterials = materials.filter(mat => {
    const matchesSearch = mat.name.toLowerCase().includes(search.toLowerCase()) || 
                          mat.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || mat.category.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

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
                <Package className="text-luxury-brass w-8 h-8" /> Material Specifications
              </h1>
              <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1 font-light">
                Catalogue of luxury timber, metals, stone, and acoustic fabrics with standard rates.
              </p>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold text-sm rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
            >
              <Plus className="w-4.5 h-4.5" /> Add Material Specs
            </button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-3 top-3.5 h-4.5 w-4.5 text-luxury-brass/50" />
              <input
                type="text"
                placeholder="Search materials or supplier details..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/20 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass"
              />
            </div>
            
            <div className="md:col-span-4 relative">
              <Filter className="absolute left-3 top-3.5 h-4.5 w-4.5 text-luxury-brass/50" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/20 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass appearance-none"
              >
                <option value="All">All Categories</option>
                <option value="Flooring">Flooring / Stone</option>
                <option value="Metal">Metal Work</option>
                <option value="Timber">Timber / Joinery</option>
                <option value="Acoustic">Acoustic Panel</option>
                <option value="Upholstery">Upholstery</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 border-4 border-luxury-brass border-t-transparent animate-spin rounded-full"></div>
            </div>
          ) : filteredMaterials.length === 0 ? (
            <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 rounded-xl p-12 text-center">
              <Package className="w-12 h-12 text-luxury-brass/40 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-serif font-semibold text-luxury-slate dark:text-luxury-ivory">No materials found</h3>
              <p className="text-sm text-luxury-slate/50 dark:text-luxury-ivory/50 mt-1">Try refining your search terms or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map(mat => (
                <div 
                  key={mat.id}
                  className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 hover:border-luxury-brass/25 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-luxury-brass bg-luxury-brass/5 px-2 py-0.5 rounded border border-luxury-brass/15">
                        {mat.category}
                      </span>
                      <span className="text-xs font-semibold text-luxury-slate/50 dark:text-luxury-ivory/50">
                        {mat.grade}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-luxury-slate dark:text-luxury-ivory mt-3 mb-1">
                      {mat.name}
                    </h3>
                    <p className="text-xs text-luxury-slate/40 dark:text-luxury-ivory/40">
                      Supplier: {mat.supplier}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-luxury-brass/10">
                      <div>
                        <span className="text-[10px] uppercase text-luxury-brass font-bold tracking-wider block">Standard Rate</span>
                        <span className="text-sm font-semibold font-serif text-luxury-slate dark:text-luxury-ivory flex items-center gap-0.5 mt-0.5">
                          <DollarSign className="w-3.5 h-3.5" /> {mat.rate}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-luxury-brass font-bold tracking-wider block">In Stock</span>
                        <span className="text-sm font-semibold text-luxury-slate dark:text-luxury-ivory block mt-0.5">
                          {mat.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Material Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-luxury-dark/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/15 max-w-md w-full rounded-2xl p-6 shadow-2xl relative animate-scale-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-luxury-slate/60 dark:text-luxury-ivory/60 hover:text-luxury-brass"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-2">Add Material Specification</h3>
            <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 mb-6">Create a new entry in your luxury interior design spec database.</p>

            <form onSubmit={handleAddMaterial} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Material Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Calacatta Gold Marble"
                  className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  >
                    <option value="Flooring / Stone">Flooring / Stone</option>
                    <option value="Metal Work">Metal Work</option>
                    <option value="Timber / Joinery">Timber / Joinery</option>
                    <option value="Panels / Acoustic">Acoustic Panel</option>
                    <option value="Upholstery">Upholstery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Grade / Quality</label>
                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    placeholder="e.g. Premium A"
                    className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Standard Rate *</label>
                  <input
                    type="text"
                    name="rate"
                    required
                    value={formData.rate}
                    onChange={handleInputChange}
                    placeholder="e.g. 750 per sq.ft"
                    className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Stock Level *</label>
                  <input
                    type="text"
                    name="stock"
                    required
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="e.g. 1500 sq.ft"
                    className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-luxury-brass uppercase tracking-wider mb-1.5">Supplier Name</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  placeholder="e.g. Italian Stone Emporium"
                  className="w-full px-4 py-2.5 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.01] mt-4"
              >
                Add to Catalogue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialsPage;
