import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, ArrowRight } from 'lucide-react';
import { HERO_TITLE, HERO_SUBTITLE } from '../constants';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-12 px-6 overflow-hidden min-h-[85vh] flex items-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles size={12} className="animate-pulse" /> Available for New Opportunities
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 italic leading-[1.1] tracking-tighter">
            {HERO_TITLE.split(',')[0]}, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 font-sans not-italic font-black">
              {HERO_TITLE.split(',')[1]}
            </span>
          </h1>

          <p className="text-white/60 text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
            {HERO_SUBTITLE}
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a
              href="mailto:ticonnam@gmail.com"
              className="group relative inline-flex items-center gap-3 bg-indigo-600 text-white px-7 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
            >
              <Mail size={14} /> Let's Connect <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Straightened Rectangular Image & Pink-Purple Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Straightened Rectangular Wrapper */}
          <div className="relative group w-full max-w-[360px]">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative rounded-[3rem] overflow-hidden border-4 border-purple-500/80 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-slate-900"
            >
              <img
                src="/the_beautiful_ticonna.jpg"
                alt="Ticonna McKinney"
                className="w-full h-auto aspect-[4/5] object-cover transition-all duration-700"
              /> {/* Straightened and in full color */}

              {/* Refined UI/UX Badge - Color Matched */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white border border-purple-100 p-4 rounded-2xl flex items-center justify-between shadow-2xl transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div className="flex flex-col">
                  <span className="text-[8px] text-purple-600 font-black uppercase tracking-[0.2em]">Research-Driven</span>
                  <span className="text-slate-900 text-[11px] font-black uppercase tracking-tight italic">UI/UX Designer</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shrink-0 ml-2 shadow-lg">
                   <Sparkles size={14} className="text-white" />
                </div>
              </div>
            </motion.div>

            {/* Soft Purple Glow Behind Image */}
            <div className="absolute -inset-2 bg-purple-500/10 blur-2xl rounded-[3rem] -z-10 opacity-100" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;