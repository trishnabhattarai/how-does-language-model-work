import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';
import { useChatContext } from '../context/ChatContext';

const MessageList: React.FC = () => {
  const { messages, isAiTyping } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  return (
    <motion.div 
      className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <Bot size={48} className="mb-4 text-blue-500" />
          <p className="text-lg">How can I help you today?</p>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <MessageItem 
              key={index} 
              text={message.text} 
              isBot={message.isBot} 
            />
          ))}
          {isAiTyping && <TypingIndicator />}
        </>
      )}
      <div ref={messagesEndRef} />
    </motion.div>
  );
};

export default MessageList