import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <nav className={`max-w-4xl mx-auto flex justify-between items-center px-8 py-3 rounded-full transition-all duration-500 border ${
        isScrolled 
          ? 'bg-black/40 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent border-transparent'
      }`}>
        {/* God Tier Logo Style */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif tracking-tighter italic cursor-pointer group"
        >
          T<span className="text-indigo-500 group-hover:text-purple-400 transition-colors">M</span>
        </motion.div>

        {/* Optimized Navigation */}
        <ul className="flex gap-8 items-center">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <a
                href={link.href}
                className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </motion.li>
          ))}

          {/* God Tier CTA */}
          <motion.li
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="#contact"
              className="px-5 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300"
            >
              Hire Me
            </a>
          </motion.li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;