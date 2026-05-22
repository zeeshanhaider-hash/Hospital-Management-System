import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneOff, Phone } from 'lucide-react';

const EmergencyBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.a
            href="tel:911"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-4 px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-2xl shadow-red-500/50 flex items-center space-x-2 hover:bg-red-700"
          >
            <Phone size={20} /> <span>Call 911</span>
          </motion.a>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-colors ${
          isOpen ? 'bg-slate-700' : 'bg-red-600 animate-pulse shadow-red-500/50'
        }`}
      >
        {isOpen ? <PhoneOff size={28} /> : <Phone size={28} />}
      </motion.button>
    </div>
  );
};

export default EmergencyBtn;
