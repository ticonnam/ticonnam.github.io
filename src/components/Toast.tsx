import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-4 bg-[#0d0f14] border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-500/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20">
            <CheckCircle className="text-emerald-500" size={18} />
          </div>
          <p className="text-white text-sm font-medium">{message}</p>
          <button
            onClick={onClose}
            className="ml-4 p-1 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;