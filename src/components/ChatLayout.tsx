import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useChatContext } from '../context/ChatContext';

const ChatLayout: React.FC = () => {
  const { messages, isAiTyping } = useChatContext();
  
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto shadow-lg bg-white">
      <ChatHeader />
      <MessageList messages={messages} isAiTyping={isAiTyping} />
      <ChatInput />
    </div>
  );
};

export default ChatLayout;
