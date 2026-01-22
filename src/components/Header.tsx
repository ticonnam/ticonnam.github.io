import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { SectionId } from '../types';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: `#${SectionId.WORK}` },
    { name: 'About', href: `#${SectionId.ABOUT}` },
    { name: 'Contact', href: `#${SectionId.CONTACT}` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 pointer-events-none">
      <div className="container mx-auto px-6 max-w-7xl pt-6">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            relative flex justify-between items-center transition-all duration-500 pointer-events-auto
            ${isScrolled 
              ? 'bg-[#0d0f14]/80 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-2xl shadow-2xl' 
              : 'bg-transparent px-0 py-4'}
          `}
        >
          {/* Logo Section */}
          <a
            href="#"
            className="text-2xl font-serif font-bold text-white tracking-tighter group flex items-center gap-1"
          >
            TM
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-indigo-500"
            >
              .
            </motion.span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="relative text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}

            <motion.a
              href={`#${SectionId.CONTACT}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              Hire Ticonna <ArrowRight size={14} />
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0a0c10] z-[110] p-8 md:hidden pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-serif font-bold text-white">TM<span className="text-indigo-500">.</span></span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-serif font-bold text-slate-500 hover:text-white transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href={`#${SectionId.CONTACT}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 text-center px-5 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest"
              >
                Let's Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;