import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import { SectionId } from '../types';
import ticonnaPhoto from '/public/the_beautiful_ticonna.jpg';

const Hero: React.FC = () => {
  return (
    <section
      id={SectionId.HERO}
      className="relative min-h-screen flex items-center justify-center pt-20"
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24">

          {/* Left Column: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-block"
            >
              <span className="py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                Available for Junior UX Designer roles
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight text-white"
            >
              Designing for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                People.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 font-light"
            >
              Hi, I'm Ticonna. A Junior UX Designer transforming complex problems into intuitive, user-friendly designs through research and empathy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center lg:justify-start gap-4"
            >
              <a href="#work" className="px-8 py-4 bg-indigo-600 rounded-full font-bold text-white shadow-lg shadow-indigo-500/25 flex items-center gap-2 hover:bg-indigo-500 transition-all">
                View My Work <ArrowRight size={18} />
              </a>
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/ticonna-mckinney-8580a6263" className="p-4 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"><Linkedin size={20} /></a>
                <a href="mailto:ticonnam@gmail.com" className="p-4 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"><Mail size={20} /></a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full animate-pulse" />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl rotate-3">
                <img
                  src={ticonnaPhoto}
                  alt="Ticonna Mckinney"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;