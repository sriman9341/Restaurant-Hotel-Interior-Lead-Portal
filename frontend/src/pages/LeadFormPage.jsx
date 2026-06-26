import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Toast from '../components/Toast';
import { User, Phone, Mail, Building, MapPin, Grid, Users, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

const LeadFormPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [submittedLead, setSubmittedLead] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    company: '',
    projectType: 'Restaurant',
    seatingCapacity: '',
    area: '',
    location: '',
    theme: 'Luxury',
    kitchenRequired: false,
    barRequired: false,
    outdoorSeating: false,
    budget: 'Under 5 Lakhs',
    timeline: 'Immediate',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.name.trim()) return 'Please enter your name';
      if (!formData.mobile.trim() || !/^\+?[0-9]{10,14}$/.test(formData.mobile.replace(/[\s-]/g, ''))) {
        return 'Please enter a valid mobile number (10-12 digits)';
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        return 'Please enter a valid email address';
      }
    } else if (currentStep === 2) {
      if (!formData.location.trim()) return 'Please enter project location';
      const cap = Number(formData.seatingCapacity);
      if (isNaN(cap) || cap <= 0) return 'Seating capacity must be a positive number';
      const areaVal = Number(formData.area);
      if (isNaN(areaVal) || areaVal <= 0) return 'Area must be a positive number';
    }
    return null;
  };

  const handleNext = () => {
    const error = validateStep(step);
    if (error) {
      setToast({ type: 'error', message: error });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateStep(3);
    if (error) {
      setToast({ type: 'error', message: error });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/api/leads', formData);
      if (res.data && res.data.success) {
        setSubmittedLead(res.data.data);
        setToast({ type: 'success', message: 'Enquiry submitted successfully!' });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to submit enquiry. Please try again.';
      setToast({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  if (submittedLead) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-luxury-cream dark:bg-luxury-dark px-4 transition-colors duration-300">
        <div className="max-w-xl w-full bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/20 p-8 rounded-2xl shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-luxury-brass/10 rounded-full flex items-center justify-center mx-auto text-luxury-gold border border-luxury-brass/35">
            <Check className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory">
              Enquiry Submitted
            </h2>
            <p className="text-luxury-brass font-medium text-sm mt-1 uppercase tracking-widest flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 animate-spin-slow" /> Glory Simon Interiors
            </p>
          </div>
          <p className="text-sm text-luxury-slate/70 dark:text-luxury-ivory/70 max-w-sm mx-auto">
            Thank you for requesting a consultation. Our design team will analyze your space parameters and reach out within 24 hours.
          </p>

          <div className="bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 p-5 rounded-xl text-left space-y-2.5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-luxury-brass">
              Project Brief Summary
            </h4>
            <div className="grid grid-cols-2 gap-y-2 text-xs text-luxury-slate/85 dark:text-luxury-ivory/80">
              <div><span className="opacity-60">Client:</span> {submittedLead.name}</div>
              <div><span className="opacity-60">Scope:</span> {submittedLead.projectType}</div>
              <div><span className="opacity-60">Dimensions:</span> {submittedLead.area} Sq Ft</div>
              <div><span className="opacity-60">Theme:</span> {submittedLead.theme}</div>
              <div><span className="opacity-60">Budget Range:</span> {submittedLead.budget}</div>
              <div><span className="opacity-60">Current Status:</span> <span className="font-semibold text-luxury-gold">{submittedLead.status}</span></div>
            </div>
            <div className="mt-4 pt-3 border-t border-luxury-brass/10 text-[11px] text-center text-luxury-slate/50 dark:text-luxury-ivory/50">
              Tracking Code:{' '}
              <span className="font-mono font-bold select-all text-luxury-slate dark:text-luxury-ivory">
                {submittedLead._id}
              </span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setSubmittedLead(null);
                setFormData({
                  name: '',
                  mobile: '',
                  email: '',
                  company: '',
                  projectType: 'Restaurant',
                  seatingCapacity: '',
                  area: '',
                  location: '',
                  theme: 'Luxury',
                  kitchenRequired: false,
                  barRequired: false,
                  outdoorSeating: false,
                  budget: 'Under 5 Lakhs',
                  timeline: 'Immediate',
                  notes: ''
                });
                setStep(1);
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark dark:text-luxury-dark font-bold rounded-lg hover:shadow-md transition-all duration-300"
            >
              Submit Another Brief
            </button>
            <Link
              to="/"
              className="px-6 py-2.5 border border-luxury-brass/35 text-luxury-slate dark:text-luxury-ivory font-semibold rounded-lg hover:bg-luxury-brass/5 transition-all duration-300 flex items-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 px-4 bg-luxury-cream dark:bg-luxury-dark transition-colors duration-300">
      <div className="max-w-2xl mx-auto bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 hover:border-luxury-brass/25 p-8 rounded-2xl shadow-xl transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory">
            Consultation Brief Request
          </h2>
          <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1">
            Provide details of your hospitality space for a customized quotation
          </p>
        </div>

        <div className="flex justify-between items-center mb-8 max-w-xs mx-auto relative">
          <div className="absolute left-0 right-0 h-0.5 bg-luxury-brass/20 top-1/2 -translate-y-1/2 -z-10"></div>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                step >= s
                  ? 'bg-luxury-gold text-luxury-dark border-luxury-gold'
                  : 'bg-luxury-cream dark:bg-luxury-dark text-luxury-slate/40 dark:text-luxury-ivory/40 border-luxury-brass/20'
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-luxury-brass mb-4">
                Step 1: Contact Details
              </h3>

              <div>
                <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                  Client / Lead Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-luxury-brass/50">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory placeholder-luxury-slate/30 focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-luxury-brass/50">
                      <Phone className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory placeholder-luxury-slate/30 focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                      placeholder="e.g. 9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-luxury-brass/50">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory placeholder-luxury-slate/30 focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                  Company Name (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-luxury-brass/50">
                    <Building className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory placeholder-luxury-slate/30 focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                    placeholder="Enter brand / company name"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-luxury-brass mb-4">
                Step 2: Space Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                    Project Segment *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                  >
                    <option value="Restaurant">Restaurant</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Resort">Resort</option>
                    <option value="Banquet Hall">Banquet Hall</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                    Project Location *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-luxury-brass/50">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory placeholder-luxury-slate/30 focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                      placeholder="e.g. Connaught Place, Delhi"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                    Estimated Seating Capacity *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-luxury-brass/50">
                      <Users className="h-5 w-5" />
                    </div>
                    <input
                      type="number"
                      name="seatingCapacity"
                      required
                      min="1"
                      value={formData.seatingCapacity}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory placeholder-luxury-slate/30 focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                      placeholder="e.g. 150"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                    Carpet Area (in Sq Ft) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-luxury-brass/50">
                      <Grid className="h-5 w-5" />
                    </div>
                    <input
                      type="number"
                      name="area"
                      required
                      min="1"
                      value={formData.area}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory placeholder-luxury-slate/30 focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                      placeholder="e.g. 3000"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-luxury-brass mb-4">
                Step 3: Design & Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                    Design Theme Motif *
                  </label>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                  >
                    <option value="Luxury">Luxury (Brass / Velvet / Gold)</option>
                    <option value="Modern">Modern (Minimalist / Monochromatic)</option>
                    <option value="Contemporary">Contemporary (Organic Shapes / Textures)</option>
                    <option value="Industrial">Industrial (Exposed Brick / Iron / Concrete)</option>
                    <option value="Traditional">Traditional (Ornate Wood / Royal Heritage)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                    Timeline Needs *
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="1–3 Months">1–3 Months</option>
                    <option value="3–6 Months">3–6 Months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                  Estimated Budget Range *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                >
                  <option value="Under 5 Lakhs">Under 5 Lakhs</option>
                  <option value="5–10 Lakhs">5–10 Lakhs</option>
                  <option value="10–25 Lakhs">10–25 Lakhs</option>
                  <option value="25–50 Lakhs">25–50 Lakhs</option>
                  <option value="Above 50 Lakhs">Above 50 Lakhs</option>
                </select>
              </div>

              <div className="py-2 space-y-3">
                <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70">
                  Functional Layout Add-ons
                </label>
                <div className="flex flex-wrap gap-6 text-sm">
                  <label className="flex items-center space-x-2 text-luxury-slate/80 dark:text-luxury-ivory/80 cursor-pointer">
                    <input
                      type="checkbox"
                      name="kitchenRequired"
                      checked={formData.kitchenRequired}
                      onChange={handleChange}
                      className="rounded border-luxury-brass text-luxury-gold focus:ring-luxury-brass h-4 w-4 bg-luxury-cream dark:bg-luxury-dark"
                    />
                    <span>Commercial Kitchen Layout</span>
                  </label>

                  <label className="flex items-center space-x-2 text-luxury-slate/80 dark:text-luxury-ivory/80 cursor-pointer">
                    <input
                      type="checkbox"
                      name="barRequired"
                      checked={formData.barRequired}
                      onChange={handleChange}
                      className="rounded border-luxury-brass text-luxury-gold focus:ring-luxury-brass h-4 w-4 bg-luxury-cream dark:bg-luxury-dark"
                    />
                    <span>Bar Counter Lounge</span>
                  </label>

                  <label className="flex items-center space-x-2 text-luxury-slate/80 dark:text-luxury-ivory/80 cursor-pointer">
                    <input
                      type="checkbox"
                      name="outdoorSeating"
                      checked={formData.outdoorSeating}
                      onChange={handleChange}
                      className="rounded border-luxury-brass text-luxury-gold focus:ring-luxury-brass h-4 w-4 bg-luxury-cream dark:bg-luxury-dark"
                    />
                    <span>Outdoor Alfresco Dining</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-luxury-slate/70 dark:text-luxury-ivory/70 mb-2">
                  Additional Layout Details / Brief Notes
                </label>
                <textarea
                  name="notes"
                  rows="4"
                  value={formData.notes}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-brass transition-colors text-sm"
                  placeholder="Describe your vision, specific acoustics, storage needs, color guidelines..."
                ></textarea>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-luxury-brass/10">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1 px-4 py-2 border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory hover:bg-luxury-brass/5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1 px-6 py-2.5 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark dark:text-luxury-dark font-bold rounded-lg hover:shadow-md hover:scale-[1.01] transition-all"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1 px-6 py-2.5 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark dark:text-luxury-dark font-bold rounded-lg hover:shadow-md hover:scale-[1.01] transition-all"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-luxury-dark border-t-transparent animate-spin rounded-full"></div>
                ) : (
                  <>Submit Brief</>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default LeadFormPage;
