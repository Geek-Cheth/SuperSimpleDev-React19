function WelcomeMessage({ chatMessages }){
  return(
    <>
      {chatMessages.length === 0 && (
        <p className="empty-chat-message">
          Welcome to the chatbot project! Send a message using the textbox below
          </p>
      )}
    </>
  );
}

export default WelcomeMessage;