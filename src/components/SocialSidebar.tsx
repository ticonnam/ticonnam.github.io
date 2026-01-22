import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const SocialSidebar: React.FC = () => {
  const socialLinks = [
    { Icon: Github, href: "https://github.com/ticonnam", label: "Github" },
    { Icon: Linkedin, href: "https://linkedin.com/in/ticonna-mckinney-8580a6263", label: "LinkedIn" },
    { Icon: Mail, href: "mailto:ticonnam@gmail.com", label: "Email" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed left-6 bottom-0 z-[100] hidden lg:flex flex-col items-center gap-6"
    >
      <div className="flex flex-col gap-6">
        {socialLinks.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-indigo-400 transition-all duration-300 group relative"
            whileHover={{ scale: 1.2, y: -4 }}
          >
            <link.Icon size={20} />
            <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">
              {link.label}
            </span>
          </motion.a>
        ))}
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "120px" }}
        transition={{ delay: 1.5, duration: 1 }}
        className="w-px bg-gradient-to-t from-transparent via-indigo-500/50 to-indigo-500/50"
      />
    </motion.div>
  );
};

export default SocialSidebar;