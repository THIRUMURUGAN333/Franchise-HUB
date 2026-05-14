import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFranchises } from '../services/api';

const botReplies = async (msg) => {
  const text = msg.toLowerCase();

  if (text.includes('hello') || text.includes('hi') || text.includes('hey'))
    return "Hi there! 👋 I'm FranchiseBot. I can help you find the right franchise. Ask me anything!";

  if (text.includes('food') || text.includes('restaurant'))
    return "🍔 We have great Food franchises like McDonald's, Subway, and Starbucks. Want to see them?";

  if (text.includes('education') || text.includes('school') || text.includes('learning'))
    return "📚 Kumon is our top Education franchise with ROI of 25-40%. Low investment, high returns!";

  if (text.includes('gym') || text.includes('fitness'))
    return "💪 Anytime Fitness is a 24/7 gym franchise with 5,000+ locations. Investment: ₹2.5Cr - ₹5Cr.";

  if (text.includes('cheap') || text.includes('low') || text.includes('affordable') || text.includes('budget'))
    return "💰 Jan-Pro Cleaning starts at just ₹3.3L — our most affordable franchise option!";

  if (text.includes('invest') || text.includes('cost') || text.includes('price') || text.includes('rupee'))
    return "💵 Our franchises range from ₹3.3L (Jan-Pro) to ₹18.3Cr (McDonald's). What's your budget?";

  if (text.includes('roi') || text.includes('return') || text.includes('profit'))
    return "📈 Best ROI franchises: Jan-Pro (30-50%), Kumon (25-40%), Subway (20-30%). Want details?";

  if (text.includes('apply') || text.includes('join') || text.includes('start'))
    return "✅ To apply, browse a franchise and click 'Apply Now'. Fill the form and we'll contact you!";

  if (text.includes('contact') || text.includes('phone') || text.includes('email'))
    return "📞 You can reach us via the application form. Submit your details and our team will call you within 24 hours.";

  if (text.includes('retail') || text.includes('shop') || text.includes('store'))
    return "🛍️ We have Retail franchises like 7-Eleven and The UPS Store. Great for suburban locations!";

  if (text.includes('service') || text.includes('cleaning'))
    return "🔧 Service franchises include Jan-Pro Cleaning and Anytime Fitness — both with strong recurring revenue.";

  if (text.includes('best') || text.includes('top') || text.includes('popular'))
    return "⭐ Our most popular franchises are McDonald's (100%), Subway (95%), and Starbucks (92%)!";

  if (text.includes('thank'))
    return "You're welcome! 😊 Feel free to ask anything else about franchises.";

  if (text.includes('bye') || text.includes('goodbye'))
    return "Goodbye! 👋 Come back anytime. Good luck with your franchise journey!";

  // Try to match franchise name
  try {
    const res = await getFranchises({ search: msg });
    if (res.data.length > 0) {
      const f = res.data[0];
      return `🏪 ${f.name}: ${f.description} Investment: ${f.investmentRange}, ROI: ${f.roi}. Visit the listing for more!`;
    }
  } catch {}

  return "🤔 I'm not sure about that. Try asking about: food, retail, education, investment, ROI, or how to apply!";
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! 👋 I'm FranchiseBot. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 800));
    const reply = await botReplies(userMsg);
    setTyping(false);
    setMessages(prev => [...prev, { from: 'bot', text: reply }]);
  };

  const handleKey = (e) => { if (e.key === 'Enter') send(); };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
                <div>
                  <p className="text-white font-bold text-sm">FranchiseBot</p>
                  <p className="text-indigo-200 text-xs">Always here to help</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl">×</button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-700 shadow-sm rounded-bl-sm border border-gray-100'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 text-gray-400 text-sm">
                    typing...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto bg-white border-t border-gray-100">
              {['Food', 'Best ROI', 'Affordable', 'Apply'].map(q => (
                <button key={q} onClick={() => { setInput(q); }}
                  className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full whitespace-nowrap hover:bg-indigo-100 transition flex-shrink-0">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button onClick={send}
                className="bg-indigo-600 text-white w-9 h-9 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition flex-shrink-0">
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-indigo-700 transition"
      >
        {open ? '✕' : '🤖'}
      </motion.button>
    </div>
  );
}
