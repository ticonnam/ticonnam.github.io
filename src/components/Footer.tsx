import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { SectionId } from '../types';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0c10] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-start">

          {/* Column 1: Brand */}
          <div className="space-y-6">
            <a href="#" className="text-3xl font-serif font-bold text-white tracking-tighter">
              TM<span className="text-indigo-500">.</span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light italic">
              "Inclusive design for all users, building digital spaces where everyone belongs".
            </p>
          </div>

          {/* Column 2: Navigation Hub */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-2">Explore</p>
            {['Projects', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-500 hover:text-white transition-colors text-sm w-fit"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Column 3: Credentials & Social */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                UXPeak UX/UI Design Mastery Certificate
              </span>
            </div>

            <div className="flex gap-6">
              <a href="https://linkedin.com/in/ticonna-mckinney-8580a6263" className="text-slate-500 hover:text-white transition-all"><Linkedin size={20} /></a>
              <a href="https://github.com/ticonnam" className="text-slate-500 hover:text-white transition-all"><Github size={20} /></a>
              <a href="mailto:ticonnam@gmail.com" className="text-slate-500 hover:text-white transition-all"><Mail size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-700 text-[10px] uppercase tracking-[0.4em] font-medium">
            © {currentYear} Ticonna Mckinney • Designed in Oak Park, IL
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -5 }}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            Back to Top <ExternalLink size={12} className="-rotate-90" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;