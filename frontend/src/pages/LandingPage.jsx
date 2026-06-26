import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Star, Award, Compass, Layers, Milestone } from 'lucide-react';

const LandingPage = () => {
  const portfolioItems = [
    {
      title: 'Aura Fine Dining',
      type: 'Restaurant',
      location: 'New Delhi',
      desc: 'Elegant velvet seating, deep gold accents, and bespoke lighting fixtures.',
      image: '✨ Luxury Brass & Slate Theme'
    },
    {
      title: 'The Grand Palms Lobby',
      type: 'Hotel',
      location: 'Mumbai',
      desc: 'A magnificent double-height reception featuring custom glass sculptures.',
      image: '⚜️ Marble & Oak Finishes'
    },
    {
      title: 'Brew & Co. Industrial Cafe',
      type: 'Cafe',
      location: 'Bangalore',
      desc: 'Exposed conduits, distressed brickwork, and warm micro-cement flooring.',
      image: '☕ Contemporary Industrial'
    },
    {
      title: 'Azure sands lounge',
      type: 'Resort',
      location: 'Goa',
      desc: 'Open air dining decks overlooking the ocean, crafted with teak and canvas.',
      image: '🌴 Tropical Luxury'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Request Consultation',
      desc: 'Fill out our interactive enquiry detailing project parameters like area, capacity, and theme.'
    },
    {
      step: '02',
      title: 'Site Analysis',
      desc: 'Our engineers conduct site visits to verify acoustics, HVAC, structural bounds, and MEP layouts.'
    },
    {
      step: '03',
      title: 'Luxury Design Concept',
      desc: 'We draft 3D walkthroughs, mood boards, and furniture spec sheets for layout optimization.'
    },
    {
      step: '04',
      title: 'Quotation & Fit-Out',
      desc: 'A itemized transparent billing process followed by meticulous fabrication and handover.'
    }
  ];

  return (
    <div className="bg-luxury-cream dark:bg-luxury-dark transition-colors duration-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-luxury-brass/30 bg-luxury-brass/5 text-luxury-gold text-xs font-semibold uppercase tracking-widest mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> Hospitality Interior Specialists
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-serif text-luxury-slate dark:text-luxury-ivory tracking-tight leading-tight mb-6">
              Crafting Masterpieces for{' '}
              <span className="bg-gradient-to-r from-luxury-brass via-luxury-gold to-luxury-brass bg-clip-text text-transparent">
                Restaurant & Hotel
              </span>{' '}
              Spaces
            </h1>
            <p className="text-lg sm:text-xl text-luxury-slate/75 dark:text-luxury-ivory/70 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Glory Simon Interiors delivers award-winning, highly functional, and elite interior architecture tailored for commercial hospitality excellence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/enquire"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark dark:text-luxury-dark font-bold rounded-lg hover:shadow-lg hover:shadow-luxury-gold/20 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Enquire Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 border border-luxury-brass/40 text-luxury-slate dark:text-luxury-ivory font-semibold rounded-lg hover:bg-luxury-brass/5 transition-all duration-300 flex items-center justify-center"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Ambient light effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-luxury-gold/5 dark:bg-luxury-gold/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-luxury-brass/10 py-10 bg-luxury-ivory/30 dark:bg-luxury-charcoal/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 text-luxury-gold mb-2" />
              <span className="text-sm font-semibold text-luxury-slate/60 dark:text-luxury-ivory/60">Award Winning Designs</span>
            </div>
            <div className="flex flex-col items-center">
              <Compass className="w-8 h-8 text-luxury-gold mb-2" />
              <span className="text-sm font-semibold text-luxury-slate/60 dark:text-luxury-ivory/60">Acoustic & MEP Expert</span>
            </div>
            <div className="flex flex-col items-center">
              <Layers className="w-8 h-8 text-luxury-gold mb-2" />
              <span className="text-sm font-semibold text-luxury-slate/60 dark:text-luxury-ivory/60">Bespoke Furniture</span>
            </div>
            <div className="flex flex-col items-center">
              <Milestone className="w-8 h-8 text-luxury-gold mb-2" />
              <span className="text-sm font-semibold text-luxury-slate/60 dark:text-luxury-ivory/60">Turnkey Handover</span>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-4">
              Featured Hospitality Spaces
            </h2>
            <div className="h-1 w-20 bg-luxury-gold mx-auto mb-4"></div>
            <p className="text-luxury-slate/60 dark:text-luxury-ivory/60">
              Browse our architectural canvas designed to maximize footfall, functional efficiency, and brand identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 hover:border-luxury-brass/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-8 h-48 bg-gradient-to-br from-luxury-brass/10 to-luxury-gold/5 flex flex-col justify-center items-center border-b border-luxury-brass/15 text-center">
                  <div className="text-4xl mb-2">{item.image.split(' ')[0]}</div>
                  <span className="text-lg font-serif font-semibold text-luxury-slate dark:text-luxury-ivory">
                    {item.image.split(' ').slice(1).join(' ')}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-luxury-brass mt-1">
                    {item.type} Space
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory">
                      {item.title}
                    </h3>
                    <span className="text-xs text-luxury-slate/40 dark:text-luxury-ivory/40">
                      {item.location}
                    </span>
                  </div>
                  <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Workflow Steps */}
      <section className="py-20 bg-luxury-ivory/20 dark:bg-luxury-charcoal/20 border-t border-luxury-brass/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-4">
              Our Design Journey
            </h2>
            <div className="h-1 w-20 bg-luxury-gold mx-auto mb-4"></div>
            <p className="text-luxury-slate/60 dark:text-luxury-ivory/60">
              A highly structured, transparent project management workflow from initial enquiry to final walkthrough.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {workflowSteps.map((w, index) => (
              <div key={index} className="relative p-6 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 rounded-xl">
                <span className="text-5xl font-extrabold font-serif bg-gradient-to-b from-luxury-brass/30 to-luxury-gold/5 bg-clip-text text-transparent absolute top-4 right-4">
                  {w.step}
                </span>
                <h3 className="text-lg font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-3 mt-4 relative z-10">
                  {w.title}
                </h3>
                <p className="text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 leading-relaxed relative z-10">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonial Slider */}
      <section className="py-20 border-t border-luxury-brass/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center text-luxury-gold mb-6 gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl font-serif italic text-luxury-slate dark:text-luxury-ivory leading-relaxed mb-6">
            "Glory Simon Interiors completely transformed our banquet hall and seating lobby. The level of transparency in their budget estimation and detailed drawing set was remarkable. Every milestone was completed perfectly on schedule!"
          </blockquote>
          <cite className="block text-sm font-semibold uppercase tracking-wider text-luxury-brass not-italic">
            - Aditya Birla, Managing Director, Palms Banquet Group
          </cite>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-luxury-dark to-luxury-charcoal border-t border-luxury-brass/15 text-center text-luxury-ivory">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4 text-luxury-ivory">
            Ready to Design Your Hospitality Masterpiece?
          </h2>
          <p className="text-luxury-ivory/70 max-w-xl mx-auto mb-8 font-light">
            Consult with our award-winning designers today. Receive detailed cost estimations and tailored layouts.
          </p>
          <Link
            to="/enquire"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Enquire Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
