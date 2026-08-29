import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'


export function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading }){
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    const message = inputText;
    setInputText('');
    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: message,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);

    try {
      const response = await Chatbot.getResponseAsync(message);

      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
    } catch (error) {
      console.error('Failed to get chatbot response:', error);

      setChatMessages([
        ...newChatMessages,
        {
          message: 'Sorry, something went wrong. Please try again.',
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function keyHandler(event){
    if(event.key === "Enter" && inputText.trim() !== ""){
      sendMessage();
    }else if(event.key === "Escape"){
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        onChange={saveInputText}
        onKeyDown={keyHandler}
        value={inputText}
        className="input-textbox"
      />
      <button 
      onClick={sendMessage}
      className="send-button"
      disabled={isLoading || inputText.trim() === ""}
      >Send</button>
    </div>
  );
}
