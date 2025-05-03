import React from 'react';
import { Bot, User } from 'lucide-react';

interface MessageItemProps {
  text: string;
  isBot: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ text, isBot }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fadeIn`}>
      <div className={`flex max-w-[80%] md:max-w-[70%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div 
          className={`
            flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full 
            ${isBot ? 'mr-2 bg-blue-500' : 'ml-2 bg-gray-600'} 
            text-white
          `}
        >
          {isBot ? <Bot size={16} /> : <User size={16} />}
        </div>
        
        <div 
          className={`
            py-3 px-4 rounded-2xl break-words
            ${isBot 
              ? 'bg-gray-100 text-gray-800 rounded-tl-none' 
              : 'bg-blue-500 text-white rounded-tr-none'
            }
          `}
        >
          {text || 'No message received'}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;