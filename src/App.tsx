import ChatLayout from './components/ChatLayout';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <ChatProvider>
      <ChatLayout />
    </ChatProvider>
  );
}

export default App;
