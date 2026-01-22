import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId } from '../types';
import ProjectGallery from './ProjectGallery';

const Work: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);

  return (
    <section id={SectionId.WORK} className="py-32 bg-[#0a0c10] relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4 block">Selected Work</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Case Studies.</h2>
          <p className="text-slate-400 max-w-2xl text-lg font-light">
            Each project represents a deep dive into user behavior, research methodology, and accessible design.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 rounded-[2rem] border border-white/10 hover:border-indigo-500/50 transition-all duration-500 overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/80 via-transparent to-transparent" />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light">{project.description}</p>

                {/* Stats / Goals */}
                <div className="flex gap-4 mb-8 border-t border-white/5 pt-4">
                  {project.stats?.map((stat, i) => (
                    <div key={i}>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xs font-bold text-indigo-300">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Primary Action */}
                <button
                  onClick={() => setGalleryImages(project.gallery)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-indigo-600 rounded-xl border border-white/10 text-white font-bold transition-all"
                >
                  View Gallery <Maximize2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The Gallery Lightbox Overlay */}
      <ProjectGallery
        images={galleryImages || []}
        isOpen={!!galleryImages}
        onClose={() => setGalleryImages(null)}
      />
    </section>
  );
};

export default Work;