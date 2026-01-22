import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, MapPin, Linkedin } from 'lucide-react';
import { SectionId } from '../types';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id={SectionId.CONTACT} className="py-32 relative bg-[#0a0c10] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">

          {/* Left Column: Direct Hook */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4 block">Get In Touch</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                Let’s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">meaningful.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 max-w-md font-light leading-relaxed">
                I’m currently seeking Junior UX Designer roles and internships. If you’re looking for a designer who prioritizes accessibility and user empathy, I’d love to connect.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                    <Mail className="text-indigo-400" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Email</p>
                    <a href="mailto:ticonnam@gmail.com" className="text-white hover:text-indigo-400 transition-colors">ticonnam@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Location</p>
                    <p className="text-white">Oak Park, IL (Remote Friendly)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-5/12 w-full"
          >
            <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent">
              <div className="bg-[#0d0f14] p-10 rounded-[2.5rem] backdrop-blur-xl relative">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500/50 transition-all" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500/50 transition-all" placeholder="email@company.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                        <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500/50 transition-all resize-none" placeholder="Let's talk about a project..." />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                      >
                        Send Message <Send size={18} />
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 text-center"
                    >
                      <CheckCircle className="text-emerald-500 mx-auto mb-6" size={50} />
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-slate-400">Thank you for reaching out. Ticonna will respond shortly.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;