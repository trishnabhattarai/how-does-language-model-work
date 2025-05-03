import React from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => {
  return (
    <motion.div 
      className="flex justify-start mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-row">
        <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full mr-2 bg-blue-500 text-white">
          <Bot size={16} />
        </div>
        <div className="py-3 px-4 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none">
          <div className="flex space-x-2">
            <motion.div 
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div 
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;