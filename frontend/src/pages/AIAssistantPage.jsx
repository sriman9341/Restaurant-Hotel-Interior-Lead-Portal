import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Sparkles, Send, Bot, User, Trash2, ArrowRight } from 'lucide-react';

const AIAssistantPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Greetings, Admin. I am your Glory Simon AI Design assistant. I can help you analyze leads, calculate cost estimations, draft follow-up templates, and suggest premium theme materials. What can I build for you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    { label: 'Calculate Restaurant Budget', query: 'Calculate cost breakdown for a 3000 sq.ft luxury restaurant interior.' },
    { label: 'Draft Client Pitch Email', query: 'Write a premium follow-up email pitch to a hotel owner client who submitted an inquiry.' },
    { label: 'Suggest Theme Mood Board', query: 'Recommend a material palette and color mood board for a modern minimalist bakery cafe.' }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend.trim();
    if (!query) return;

    // Add user message
    const userMsg = { id: `user-${Date.now()}`, sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response after 1.5 seconds
    setTimeout(() => {
      let replyText = '';
      const lowercaseQuery = query.toLowerCase();

      if (lowercaseQuery.includes('restaurant') && (lowercaseQuery.includes('budget') || lowercaseQuery.includes('cost'))) {
        replyText = `### Luxury Restaurant Interior Budget Breakdown (3,000 Sq.Ft)
Here is an itemized cost projection based on standard rates of ₹1,200 to ₹1,800 per sq.ft. for premium fit-outs:

1. **Civil & Dismantling Work:** ₹2,50,000 (Masonry, partitions, floor scraping)
2. **Flooring (Calacatta Gold/Marble):** ₹6,00,000 (Calculated at ₹750/sq.ft.)
3. **Electrical, HVAC & Fire Safety (MEP):** ₹8,50,000 (Central ducting, acoustic ventilation, custom safety arrays)
4. **Bespoke Upholstery & Carpentry:** ₹12,00,000 (Premium velvet booths, solid teak tables, reception counter)
5. **Kitchen Equipment & Layout:** ₹15,00,000 (Stainless steel counters, commercial gas rigs, storage bins)
6. **Bespoke Gold/Brass Chandeliers:** ₹4,00,000 (Acoustic design sound baffles + theme illumination)

**Total Estimated Fit-Out:** **₹48,00,000** *(Excl. GST & designer fee)*
*Tip: We can reduce timber costs by 15% using high-grade engineered laminate instead of Burma Teak wood planks.*`;
      } 
      else if (lowercaseQuery.includes('email') || lowercaseQuery.includes('pitch') || lowercaseQuery.includes('follow-up')) {
        replyText = `### Premium Client Follow-Up Email Pitch
Copy the template below to follow up with new leads:

**Subject:** Crafting Your Next Masterpiece | Glory Simon Interiors

**Dear [Client Name],**

Thank you for sharing your consultation brief for **[Company Name]** with our design studio. We are excited about the prospect of collaborating to shape your upcoming hospitality space.

At Glory Simon Interiors, we specialize in high-end, turnkey interior architecture designed to maximize brand identity, guest comfort, and layout flow. Based on your project parameters (**[Area] Sq.Ft** with **[Theme] Theme**), our engineering team is drafting an initial layout concept.

We would love to schedule a brief **15-minute call** or a **complimentary site visit** next week to finalize details. Please let us know your availability.

Warm regards,

**Glory Simon Admin**
Principal Designer | Glory Simon Interiors
+91 93412 87654`;
      } 
      else if (lowercaseQuery.includes('mood') || lowercaseQuery.includes('theme') || lowercaseQuery.includes('palette')) {
        replyText = `### Modern Minimalist Bakery Cafe Mood Board
Here is the recommended material and lighting specs array:

*   **Core Color Scheme:** Luxury Ivory, Warm Taupe, Sage Green, and Subtle Brushed Gold.
*   **Flooring:** Micro-cement flooring (Warm Grey) to create a continuous, spacious illusion.
*   **Wall Accents:** Slatted Oak wood panels for acoustics, combined with off-white textured lime-wash paint.
*   **Counters:** Calacatta Crema marble slab tops paired with thin vertical PVD gold lining.
*   **Lighting:** Warm 2700K recessed downlights combined with organic terracotta pendant lights over the serving table.
*   **Furniture:** Rattan-backed teakwood chairs with light linen seat cushions.`;
      } 
      else {
        replyText = `I have logged your query regarding: *"${query}"*. 

As a mock assistant, I suggest querying one of the following for detailed specifications:
- **"Calculate Restaurant Budget"** (Get sq.ft cost projections)
- **"Draft Client Pitch Email"** (Get CRM follow-up drafts)
- **"Suggest Theme Mood Board"** (Get color palettes and material specs)`;
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { id: `ai-${Date.now()}`, sender: 'ai', text: replyText }]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend(input);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "Greetings, Admin. Chat cleared. Ask me anything about restaurant cost projections, material grades, or follow-up email copy."
      }
    ]);
  };

  return (
    <div className="flex bg-luxury-cream dark:bg-luxury-dark min-h-[calc(100vh-80px)] transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        
        <div className="max-w-5xl w-full mx-auto flex flex-col flex-1 bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 rounded-2xl shadow-xl overflow-hidden my-auto h-[90%]">
          
          {/* Chat Header */}
          <div className="p-4 bg-luxury-cream/50 dark:bg-luxury-dark/50 border-b border-luxury-brass/10 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-luxury-brass/15 text-luxury-gold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-luxury-slate dark:text-luxury-ivory text-base flex items-center gap-1.5">
                  AI Design Assistant <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-sans tracking-wide">Live</span>
                </h1>
                <p className="text-[10px] text-luxury-slate/50 dark:text-luxury-ivory/50">Glory Simon turn-key interior intelligence assistant</p>
              </div>
            </div>
            
            <button 
              onClick={clearChat}
              className="p-2 rounded hover:bg-rose-500/10 text-luxury-slate/60 dark:text-luxury-ivory/60 hover:text-rose-500 transition-colors"
              title="Clear Conversation"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`p-2 rounded-full shrink-0 h-9 w-9 flex items-center justify-center ${
                  msg.sender === 'ai' 
                    ? 'bg-luxury-brass/15 text-luxury-gold' 
                    : 'bg-luxury-slate/10 dark:bg-luxury-ivory/10 text-luxury-slate dark:text-luxury-ivory'
                }`}>
                  {msg.sender === 'ai' ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                </div>

                {/* Content */}
                <div className={`p-4 rounded-2xl text-sm leading-relaxed border ${
                  msg.sender === 'ai'
                    ? 'bg-luxury-cream/40 dark:bg-luxury-dark/40 border-luxury-brass/10 text-luxury-slate dark:text-luxury-ivory'
                    : 'bg-luxury-brass/10 border-luxury-brass/20 text-luxury-slate dark:text-luxury-ivory'
                }`}>
                  {/* Simplistic markdown rendering support (only for bold, lists, and headers) */}
                  {msg.text.split('\n').map((line, idx) => {
                    if (line.startsWith('### ')) {
                      return <h4 key={idx} className="font-serif font-bold text-luxury-gold text-base mt-3 mb-2">{line.replace('### ', '')}</h4>;
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={idx} className="font-bold text-luxury-gold mt-2">{line.replaceAll('**', '')}</p>;
                    }
                    if (line.startsWith('* ')) {
                      return <li key={idx} className="list-disc ml-4 text-xs mt-1">{line.replace('* ', '')}</li>;
                    }
                    if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ') || line.startsWith('6. ')) {
                      return <p key={idx} className="text-xs ml-2 mt-1.5">{line}</p>;
                    }
                    return <p key={idx} className={idx > 0 ? "mt-1 text-xs" : "text-xs"}>{line}</p>;
                  })}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="p-2 rounded-full bg-luxury-brass/15 text-luxury-gold shrink-0 h-9 w-9 flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div className="bg-luxury-cream/40 dark:bg-luxury-dark/40 border border-luxury-brass/10 p-4 rounded-2xl flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 bg-luxury-brass rounded-full animate-bounce"></div>
                  <div className="h-1.5 w-1.5 bg-luxury-brass rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-1.5 w-1.5 bg-luxury-brass rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick prompt pills */}
          {messages.length === 1 && (
            <div className="px-6 py-3 border-t border-luxury-brass/10 flex flex-wrap gap-2 shrink-0 bg-luxury-cream/10 dark:bg-luxury-dark/10">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p.query)}
                  className="px-3 py-1.5 border border-luxury-brass/35 hover:border-luxury-gold text-luxury-brass hover:text-luxury-gold text-xs rounded-full flex items-center gap-1.5 transition-all duration-300"
                >
                  {p.label} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div className="p-4 border-t border-luxury-brass/10 flex gap-3 shrink-0 bg-luxury-cream/30 dark:bg-luxury-dark/30">
            <input
              type="text"
              placeholder="Ask for cost breakdown, drafts, moodboards..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-3 bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/25 rounded-lg text-sm text-luxury-slate dark:text-luxury-ivory focus:outline-none focus:border-luxury-gold"
            />
            <button
              onClick={() => handleSend(input)}
              className="p-3.5 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>

      </main>
    </div>
  );
};

export default AIAssistantPage;
