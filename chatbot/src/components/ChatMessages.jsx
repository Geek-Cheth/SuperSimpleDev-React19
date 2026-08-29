import useAutoScroll from "./useAutoScroll";
import { ChatMessage } from "./ChatMessage";
import './ChatMessages.css'

function ChatMessages({ chatMessages, isLoading }){
  const chatMessagesRef = useAutoScroll([chatMessages, isLoading]);
  
  // const [chatMessages, setChatMessages] = array;
  
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

return (
  <div 
    className="chat-messages-container" 
    ref={chatMessagesRef}
  >
    {chatMessages.map((chatMessage) => {
      return (
              <ChatMessage 
                message = {chatMessage.message}
                sender = {chatMessage.sender}
                key = {chatMessage.id}
              />
            );
          })}

          {isLoading && (
            <ChatMessage 
              message="Loading..."
              sender="robot"
              isLoading={isLoading}
            />
          )}
          
  </div>
);}

export default ChatMessages;