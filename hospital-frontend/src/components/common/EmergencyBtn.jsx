import React, { useState } from 'react';
import { PhoneOff, Phone } from 'lucide-react';

const EmergencyBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center space-y-2">
      {/* Pulsing Circle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl transition-all ${
          isOpen 
            ? 'bg-red-600 shadow-red-500/30' 
            : 'bg-red-600 shadow-lg shadow-red-500/50 animate-pulse'
        }`}
      >
        {isOpen ? <PhoneOff size={28} /> : <Phone size={28} />}
      </motion.button>

      {/* Expanding Call Card */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="absolute bottom-24 left-0 bg-white rounded-2xl shadow-2xl p-6 w-64 border border-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-2xl"
        >
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Phone className="text-red-600 text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white text-center mb-1">Emergency</h3>
          <p className="text-sm text-slate-500 text-center mb-4">Call 112 right now!</p>
          <a 
            href="tel:112" 
            className="block w-full text-center py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg"
          >
            Call Now
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default EmergencyBtn;