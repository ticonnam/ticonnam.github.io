import React from 'react';
import { ArrowUpRight, Tag } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId } from '../types';

const Portfolio: React.FC = () => {
  return (
    <section id={SectionId.WORK} className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Selected Work</h2>
            <p className="text-slate-400 max-w-xl">
              A collection of problems solved through research, iteration, and design.
            </p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mt-4 md:mt-0">
            View all projects <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group relative bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2">
              {/* Image Container */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 bg-dark/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>

                {project.stats && (
                  <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-white/5">
                    {project.stats.map((stat, idx) => (
                      <div key={idx}>
                        <div className="text-lg font-bold text-indigo-400">{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-xs text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <a href="#" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
            View all projects <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
