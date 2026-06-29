import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Sparkles, Send, Bot, User } from 'lucide-react';

const AIAssistantPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Design & Estimation Assistant. How can I help you draft a luxury interior concept or calculate material costs today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = { 
        role: 'assistant', 
        content: `Based on your request, I recommend utilizing brushed brass accents with deep emerald velvet upholstery to elevate the aesthetic. This aligns perfectly with modern fine dining trends. Would you like me to draft a preliminary budget estimate for 2500 sq ft using these materials?` 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-luxury-cream dark:bg-luxury-dark transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto w-full flex flex-col h-full bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/20 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-6 border-b border-luxury-brass/20 bg-gradient-to-r from-luxury-brass/10 to-luxury-gold/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-luxury-brass/20 flex items-center justify-center text-luxury-gold border border-luxury-brass/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory leading-tight">
                Design AI Assistant
              </h1>
              <p className="text-xs text-luxury-slate/60 dark:text-luxury-ivory/60 font-medium">Powered by Glory Simon Intelligence</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-luxury-slate dark:bg-luxury-ivory text-luxury-cream dark:text-luxury-dark' : 'bg-luxury-brass/20 text-luxury-gold'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-luxury-slate text-luxury-ivory dark:bg-luxury-ivory dark:text-luxury-slate rounded-tr-none' 
                    : 'bg-luxury-cream dark:bg-luxury-dark border border-luxury-brass/10 text-luxury-slate dark:text-luxury-ivory rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-luxury-cream dark:bg-luxury-dark border-t border-luxury-brass/10">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for design ideas, cost estimates, or vendor suggestions..."
                className="w-full pl-4 pr-12 py-4 bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/20 rounded-xl focus:outline-none focus:border-luxury-gold text-luxury-slate dark:text-luxury-ivory text-sm transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 p-2 bg-gradient-to-r from-luxury-brass to-luxury-gold text-luxury-dark rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIAssistantPage;
