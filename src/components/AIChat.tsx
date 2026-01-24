import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'aira', text: string }[]>([
    { role: 'aira', text: "Hi! I'm Aloy. I can tell you about Ticonna's UX process for her YouTube, Bakery, or Crunchyroll projects. What would you like to know?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const sanitizedInput = input.replace(/<[^>]*>?/gm, '').slice(0, 500);
    setMessages(prev => [...prev, { role: 'user', text: sanitizedInput }]);
    setInput('');
    setIsTyping(true);

    // Call the unified service
    const responseText = await sendMessageToGemini(sanitizedInput);

    setMessages(prev => [...prev, { role: 'aira', text: responseText }]);
    setIsTyping(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[150] p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-500 transition-all group"
      >
        <MessageSquare className="group-hover:scale-110 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-8 z-[200] w-[380px] h-[500px] bg-[#0d0f14] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">AIRA <span className="text-[10px] text-indigo-400 font-mono ml-1 uppercase">Secure</span></h3>
                  <p className="text-[10px] text-white/40">Portfolio Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/10' 
                      : 'bg-white/5 text-white/80 border border-white/5 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] text-indigo-400 animate-pulse font-mono pl-2">AIRA is thinking...</div>}
            </div>

            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about Ticonna's work..."
                  className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-2 p-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <Sparkles size={10} className="text-white/20" />
                <span className="text-[8px] uppercase tracking-[0.3em] text-white/20 font-bold">Secure Portfolio Inquiry</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;