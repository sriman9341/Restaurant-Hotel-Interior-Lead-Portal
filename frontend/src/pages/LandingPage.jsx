import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Star, Award, Compass, Layers, Milestone, Phone, Mail, MapPin, Clock } from 'lucide-react';

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
      <section id="home" className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">

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

      {/* Services Section */}
      <section id="services" className="py-20 border-t border-luxury-brass/10 bg-luxury-ivory/10 dark:bg-luxury-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-4">
              Our Elite Services
            </h2>
            <div className="h-1 w-20 bg-luxury-gold mx-auto mb-4"></div>
            <p className="text-luxury-slate/60 dark:text-luxury-ivory/60">
              Turnkey interior architecture tailored specifically for high-end hospitality brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 hover:border-luxury-brass/35 p-6 rounded-xl transition-all duration-300 hover:scale-[1.01]">
              <Layers className="w-10 h-10 text-luxury-gold mb-4" />
              <h3 className="text-lg font-serif font-bold text-luxury-slate dark:text-luxury-ivory mb-2">Fine Dining</h3>
              <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 leading-relaxed">
                Bespoke furniture layout, acoustic treatments, luxury accents, and mood lighting designed for premium culinary journeys.
              </p>
            </div>
            <div className="bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 hover:border-luxury-brass/35 p-6 rounded-xl transition-all duration-300 hover:scale-[1.01]">
              <Award className="w-10 h-10 text-luxury-gold mb-4" />
              <h3 className="text-lg font-serif font-bold text-luxury-slate dark:text-luxury-ivory mb-2">Luxury Hotels</h3>
              <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 leading-relaxed">
                Grand reception lobbies, corridors, executive suites, and lounge spaces optimized for visual grandeur and guest comfort.
              </p>
            </div>
            <div className="bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 hover:border-luxury-brass/35 p-6 rounded-xl transition-all duration-300 hover:scale-[1.01]">
              <Compass className="w-10 h-10 text-luxury-gold mb-4" />
              <h3 className="text-lg font-serif font-bold text-luxury-slate dark:text-luxury-ivory mb-2">Boutique Cafes</h3>
              <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 leading-relaxed">
                Optimized counter ergonomics, aesthetic seating corners, distress/modern themes designed to maximize customer dwell-time.
              </p>
            </div>
            <div className="bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 hover:border-luxury-brass/35 p-6 rounded-xl transition-all duration-300 hover:scale-[1.01]">
              <Milestone className="w-10 h-10 text-luxury-gold mb-4" />
              <h3 className="text-lg font-serif font-bold text-luxury-slate dark:text-luxury-ivory mb-2">MEP & Acoustics</h3>
              <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 leading-relaxed">
                Integrated HVAC ventilation, acoustic isolation, safety systems, plumbing, and structural engineering compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-20 border-t border-luxury-brass/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-4">
              Featured Spaces Showcase
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

      {/* About Us Section */}
      <section id="about" className="py-20 bg-luxury-ivory/20 dark:bg-luxury-charcoal/20 border-t border-luxury-brass/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-luxury-brass">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mt-2 mb-6">
                About Glory Simon Interiors
              </h2>
              <div className="h-1 w-20 bg-luxury-gold mb-6"></div>
              <p className="text-sm text-luxury-slate/70 dark:text-luxury-ivory/70 leading-relaxed mb-4">
                Established with a vision to redefine commercial hospitality spaces, Glory Simon Interiors blends architectural aesthetics with robust operations. Our team includes premium lighting designers, acoustic engineers, and commercial kitchen specialists.
              </p>
              <p className="text-sm text-luxury-slate/70 dark:text-luxury-ivory/70 leading-relaxed">
                We believe that premium design is not just about visual appeal; it is a critical driver for restaurant seating turnover, room bookings, and operational efficiency. That is why we provide full turnkey fit-outs, guaranteed timelines, and complete cost transparency.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 p-6 rounded-xl">
                <span className="text-2xl font-bold text-luxury-brass">12+ Years</span>
                <h4 className="text-sm font-semibold text-luxury-slate dark:text-luxury-ivory mt-1">Design Experience</h4>
                <p className="text-xs text-luxury-slate/50 dark:text-luxury-ivory/50 mt-2">Delivering luxury projects across major commercial hubs.</p>
              </div>
              <div className="bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 p-6 rounded-xl">
                <span className="text-2xl font-bold text-luxury-brass">150+ Projects</span>
                <h4 className="text-sm font-semibold text-luxury-slate dark:text-luxury-ivory mt-1">Turnkey handovers</h4>
                <p className="text-xs text-luxury-slate/50 dark:text-luxury-ivory/50 mt-2">Award-winning hotels, fine dining eateries, and rooftop lounges.</p>
              </div>
              <div className="bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 p-6 rounded-xl">
                <span className="text-2xl font-bold text-luxury-brass">100% In-house</span>
                <h4 className="text-sm font-semibold text-luxury-slate dark:text-luxury-ivory mt-1">Fabrication Studio</h4>
                <p className="text-xs text-luxury-slate/50 dark:text-luxury-ivory/50 mt-2">Bespoke wooden furniture and metal joinery built under expert care.</p>
              </div>
              <div className="bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 p-6 rounded-xl">
                <span className="text-2xl font-bold text-luxury-brass">Zero Sub-letting</span>
                <h4 className="text-sm font-semibold text-luxury-slate dark:text-luxury-ivory mt-1">Direct Engineering</h4>
                <p className="text-xs text-luxury-slate/50 dark:text-luxury-ivory/50 mt-2">Every MEP and HVAC blueprint signed by our own specialists.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-luxury-brass/10 pt-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory">Our Structured Journey</h3>
              <p className="text-xs text-luxury-slate/50 dark:text-luxury-ivory/50 mt-2">A highly transparent, step-by-step project cycle</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {workflowSteps.map((w, index) => (
                <div key={index} className="relative p-6 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 rounded-xl">
                  <span className="text-5xl font-extrabold font-serif bg-gradient-to-b from-luxury-brass/25 to-luxury-gold/5 bg-clip-text text-transparent absolute top-4 right-4">
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t border-luxury-brass/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory mb-4">
              Get in Touch
            </h2>
            <div className="h-1 w-20 bg-luxury-gold mx-auto mb-4"></div>
            <p className="text-luxury-slate/60 dark:text-luxury-ivory/60">
              Visit our luxury experience design studio or request a callback.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Side: Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/15 p-6 rounded-xl flex items-start gap-4">
                <div className="p-3 rounded-lg bg-luxury-brass/10 text-luxury-gold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-luxury-slate dark:text-luxury-ivory">Our Studio Location</h4>
                  <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1 leading-relaxed">
                    102, Elite Arcade, Road No. 4, Banjara Hills,<br />
                    Hyderabad, TS, India - 500034
                  </p>
                </div>
              </div>

              <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/15 p-6 rounded-xl flex items-start gap-4">
                <div className="p-3 rounded-lg bg-luxury-brass/10 text-luxury-gold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-luxury-slate dark:text-luxury-ivory">Call Or Whatsapp</h4>
                  <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1">
                    +91 93412 87654<br />
                    +91 40 4567 8910
                  </p>
                </div>
              </div>

              <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/15 p-6 rounded-xl flex items-start gap-4">
                <div className="p-3 rounded-lg bg-luxury-brass/10 text-luxury-gold">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-luxury-slate dark:text-luxury-ivory">Mail Box</h4>
                  <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1">
                    enquiry@glorysimon.com<br />
                    design@glorysimon.com
                  </p>
                </div>
              </div>

              <div className="bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/15 p-6 rounded-xl flex items-start gap-4">
                <div className="p-3 rounded-lg bg-luxury-brass/10 text-luxury-gold">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-luxury-slate dark:text-luxury-ivory">Studio Hours</h4>
                  <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 mt-1">
                    Monday - Saturday: 10:00 AM - 07:00 PM<br />
                    Sunday: By Prior Appointment Only
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Message Form */}
            <div className="lg:col-span-7 bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/15 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-luxury-slate dark:text-luxury-ivory mb-2">Send a Message</h3>
                <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 mb-6">Have a general question? Fill out this quick message box and our team will reply in 12 hours.</p>
                <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been received."); e.target.reset(); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Project Subject (e.g. Fine dining lounge design)"
                    className="w-full px-4 py-3 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  />
                  <textarea
                    rows="4"
                    required
                    placeholder="Write your brief details here..."
                    className="w-full px-4 py-3 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold rounded-lg hover:shadow-md hover:scale-[1.01] transition-all duration-300"
                  >
                    Submit Message
                  </button>
                </form>
              </div>
            </div>
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/enquire"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/enquire"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-luxury-brass/45 text-luxury-ivory font-semibold rounded-lg hover:bg-luxury-brass/10 transition-all duration-300"
            >
              Book Site Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

