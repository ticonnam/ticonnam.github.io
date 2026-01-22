import React from 'react';
import { motion } from 'framer-motion';

const RightSidebar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="fixed right-6 bottom-0 z-[100] hidden lg:flex flex-col items-center gap-6"
    >
      <a
        href="mailto:ticonnam@gmail.com"
        className="text-slate-500 hover:text-indigo-400 transition-all duration-300 text-[10px] font-mono tracking-[0.3em] [writing-mode:vertical-rl] mb-4"
      >
        ticonnam@gmail.com
      </a>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "120px" }}
        transition={{ delay: 1.7, duration: 1 }}
        className="w-px bg-gradient-to-t from-transparent via-indigo-500/50 to-indigo-500/50"
      />
    </motion.div>
  );
};

export default RightSidebar;