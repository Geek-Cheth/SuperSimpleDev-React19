import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import WelcomeMessage from './components/WelcomeMessage';
import ChatMessages  from './components/ChatMessages';
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app-container">
      < WelcomeMessage chatMessages={chatMessages}/>
      <ChatMessages 
      chatMessages={chatMessages}
      isLoading={isLoading}
      />
      <ChatInput 
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      />
      </div>
  );
}

export default App
