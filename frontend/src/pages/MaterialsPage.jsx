import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Package, Search, Filter, Box } from 'lucide-react';

const MaterialsPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const materials = [
    { id: 1, name: 'Statuario Marble', category: 'Stone', stock: '2500 Sq Ft', price: '₹1200/SqFt', supplier: 'Italian Marble Co.' },
    { id: 2, name: 'Brushed Brass Inlay', category: 'Metal', stock: '500 M', price: '₹450/M', supplier: 'Luxe Metals' },
    { id: 3, name: 'Burma Teak Veneer', category: 'Wood', stock: '120 Sheets', price: '₹220/SqFt', supplier: 'Premium Woods Ltd' },
    { id: 4, name: 'Emerald Velvet Fabric', category: 'Upholstery', stock: '400 M', price: '₹1800/M', supplier: 'Royal Fabrics' },
    { id: 5, name: 'Micro-cement Finish', category: 'Coating', stock: '50 Buckets', price: '₹5500/Bucket', supplier: 'Modern Finishes' },
    { id: 6, name: 'Fluted Glass Panels', category: 'Glass', stock: '80 Sq M', price: '₹850/SqM', supplier: 'Crystal Clear Inc.' },
  ];

  const filteredMaterials = materials.filter(m => 
    (category === 'All' || m.category === category) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-luxury-cream dark:bg-luxury-dark transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory">
                Materials Library
              </h1>
              <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1">
                Browse and manage inventory for premium interior materials
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold rounded-lg hover:shadow-md transition-all">
              <Box className="w-4 h-4" /> Add Material
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-slate/40 dark:text-luxury-ivory/40" />
              <input
                type="text"
                placeholder="Search materials by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/20 rounded-lg text-sm focus:outline-none focus:border-luxury-gold text-luxury-slate dark:text-luxury-ivory"
              />
            </div>
            <div className="relative w-full md:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-slate/40 dark:text-luxury-ivory/40" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/20 rounded-lg text-sm focus:outline-none focus:border-luxury-gold text-luxury-slate dark:text-luxury-ivory appearance-none"
              >
                <option value="All">All Categories</option>
                <option value="Stone">Stone</option>
                <option value="Metal">Metal</option>
                <option value="Wood">Wood</option>
                <option value="Upholstery">Upholstery</option>
                <option value="Coating">Coating</option>
                <option value="Glass">Glass</option>
              </select>
            </div>
          </div>

          <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-luxury-slate dark:text-luxury-ivory">
                <thead className="bg-luxury-cream dark:bg-luxury-dark border-b border-luxury-brass/10">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Material Name</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Stock Level</th>
                    <th className="px-6 py-4 font-semibold">Unit Price</th>
                    <th className="px-6 py-4 font-semibold">Primary Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((m) => (
                    <tr key={m.id} className="border-b border-luxury-brass/5 hover:bg-luxury-brass/5 transition-colors">
                      <td className="px-6 py-4 font-medium">{m.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-luxury-brass/10 text-luxury-gold rounded text-xs font-semibold">
                          {m.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">{m.stock}</td>
                      <td className="px-6 py-4">{m.price}</td>
                      <td className="px-6 py-4 opacity-75">{m.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MaterialsPage;
