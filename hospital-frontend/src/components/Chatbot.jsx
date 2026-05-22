import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'AI Assistant', text: "Hello! I am ZH-Care AI. How can I assist you today?" }
  ]);
  const [msg, setMsg] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    
    setMessages(prev => [...prev, { from: 'You', text: msg }]);
    setMsg("");
    
    // ✅ SEND TO BACKEND (or fallback to fake reply)
    try {
        // If you have backend endpoint /chatbot:
        const { data } = await API.post('/chatbot', { message: msg });
        setMessages(prev => [...prev, { from: 'AI', text: data.reply }]);
    } catch (error) {
        // If backend fails, use fake reply
        setTimeout(() => {
            setMessages(prev => [...prev, { from: 'AI', text: "I'm currently offline, but usually I can help with appointments or doctor info!" }]);
        }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2 font-bold">
                <MessageCircle className="text-xl" />
                <span>ZH-Care AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {/* Chat History */}
            <div className="p-4 h-64 overflow-y-auto bg-slate-50 dark:bg-slate-900">
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2.5 ${msg.from === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2.5 rounded-2xl max-w-[75%] text-sm ${
                      msg.from === 'You' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center text-white"
      >
        <MessageCircle className="text-3xl" />
      </motion.button>
    </div>
  );
};

export default Chatbot;