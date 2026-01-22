import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { EXPERIENCE } from '../constants';
import { FileText, Award, Layers, Target, ShieldCheck, Search } from 'lucide-react';
import Toast from './Toast';

const About: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  const handleDownload = () => {
    setShowToast(true);
    // Note: The browser will handle the actual file opening via the <a> href
  };

  return (
    <section id={SectionId.ABOUT} className="py-32 relative bg-[#0a0c10] overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Header Section */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4 block"
          >
            The Designer's Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Empathy-Led <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Design.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed"
          >
            I solve real-world problems by observing human behavior and understanding frustrations. My goal is to build digital solutions that remove friction and feel invisible to the user.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: Professional Timeline (7 Columns) */}
          <div className="lg:col-span-7 space-y-10">
            <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-8">
              <Award className="text-indigo-400" size={24} /> Education & Credentials
            </h3>

            <div className="relative border-l border-white/10 ml-3 pl-8 space-y-12">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline Indicator */}
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#0a0c10] border-2 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]" />

                  <div className="mb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <h4 className="text-xl font-bold text-white leading-tight">{exp.role}</h4>
                    <span className="text-indigo-400 font-serif italic text-sm shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-indigo-300/80 text-sm font-semibold mb-4 uppercase tracking-wider">{exp.company}</p>
                  <p className="text-slate-400 font-light leading-relaxed text-sm max-w-xl">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: The Method & Toolkit (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl relative overflow-hidden group">
              {/* Subtle Decorative Icon */}
              <Search className="absolute -top-6 -right-6 text-white/5 w-32 h-32 rotate-12 group-hover:text-indigo-500/10 transition-colors duration-700" />

              <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-3">
                <ShieldCheck className="text-emerald-400" size={24} /> My UX Process
              </h3>

              <div className="space-y-8">
                {[
                  { label: 'Understand', desc: 'Personas & Empathy Maps', icon: Target },
                  { label: 'Ideate', desc: 'User Flows & Wireframing', icon: Layers },
                  { label: 'Refine', desc: 'High-Fidelity Prototyping', icon: Search }
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-5 group/item">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover/item:border-indigo-500/30 group-hover/item:bg-indigo-500/5 transition-all">
                      <step.icon className="text-slate-400 group-hover/item:text-indigo-400" size={20} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm tracking-wide">{step.label}</p>
                      <p className="text-slate-500 text-xs font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Tags Container */}
              <div className="mt-12 pt-10 border-t border-white/10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-6">Expertise</p>
                <div className="flex flex-wrap gap-2.5">
                  {['Figma', 'UX Research', 'Accessibility', 'Mobile First', 'Information Architecture'].map(skill => (
                    <span key={skill} className="px-3.5 py-1.5 bg-indigo-500/5 border border-indigo-500/20 rounded-full text-[10px] text-indigo-300 font-bold uppercase tracking-widest">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume Call to Action */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/ticonna-mckinney-resume.pdf"
              onClick={handleDownload}
              target="_blank"
              className="group w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-500/25"
            >
              <FileText size={20} className="group-hover:rotate-6 transition-transform" />
              Download Resume
            </motion.a>
          </div>
        </div>
      </div>

      {/* Global Success Notification */}
      <Toast
        isVisible={showToast}
        message="Resume downloaded successfully!"
        onClose={() => setShowToast(false)}
      />
    </section>
  );
};

export default About;