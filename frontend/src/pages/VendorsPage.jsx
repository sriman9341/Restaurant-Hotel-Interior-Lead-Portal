import React from 'react';
import Sidebar from '../components/Sidebar';
import { Users, Mail, Phone, ExternalLink } from 'lucide-react';

const VendorsPage = () => {
  const vendors = [
    { id: 1, name: 'Italian Marble Co.', type: 'Material Supplier', contact: 'Rahul Verma', phone: '+91 98765 43210', email: 'sales@italianmarble.in', rating: 4.8 },
    { id: 2, name: 'Luxe Metals', type: 'Fabricator', contact: 'Amit Singh', phone: '+91 87654 32109', email: 'quotes@luxemetals.com', rating: 4.5 },
    { id: 3, name: 'Elite Acoustics', type: 'Specialist Contractor', contact: 'Priya Patel', phone: '+91 76543 21098', email: 'info@eliteacoustics.in', rating: 4.9 },
    { id: 4, name: 'Royal Fabrics', type: 'Material Supplier', contact: 'Neha Sharma', phone: '+91 65432 10987', email: 'orders@royalfabrics.com', rating: 4.2 },
  ];

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-luxury-cream dark:bg-luxury-dark transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory">
                Vendor Management
              </h1>
              <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1">
                Manage contractors, suppliers, and artisan networks
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold rounded-lg hover:shadow-md transition-all">
              <Users className="w-4 h-4" /> Add Vendor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 p-6 rounded-xl hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-luxury-brass/10 text-luxury-gold border border-luxury-brass/20">
                      {vendor.type}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-luxury-gold">
                      ★ {vendor.rating}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-1">
                    {vendor.name}
                  </h3>
                  <p className="text-sm font-medium text-luxury-slate/70 dark:text-luxury-ivory/70 mb-4">
                    POC: {vendor.contact}
                  </p>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-luxury-brass/10">
                  <a href={`tel:${vendor.phone}`} className="flex items-center gap-2 text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 hover:text-luxury-brass transition-colors">
                    <Phone className="w-4 h-4 text-luxury-brass" /> {vendor.phone}
                  </a>
                  <a href={`mailto:${vendor.email}`} className="flex items-center gap-2 text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 hover:text-luxury-brass transition-colors">
                    <Mail className="w-4 h-4 text-luxury-brass" /> {vendor.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorsPage;
