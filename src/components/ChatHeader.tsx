import React from 'react';
import { Bot, Trash2 } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

const ChatHeader: React.FC = () => {
  const { clearMessages } = useChatContext();
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white z-10 shadow-sm">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
          <Bot size={20} />
        </div>
        <h1 className="ml-3 text-xl font-semibold text-gray-800">AI Assistant</h1>
      </div>
      <button 
        onClick={clearMessages}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label="Clear chat"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;