import React from 'react';
import ChatLayout from './components/ChatLayout';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ChatProvider>
        <ChatLayout />
      </ChatProvider>
    </div>
  );
}

export default App;