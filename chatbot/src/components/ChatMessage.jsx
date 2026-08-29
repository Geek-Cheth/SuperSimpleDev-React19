import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'

export function ChatMessage({message, sender, isLoading=false}){
  // console.log(props)

  // const message = props.message;
  // const sender = props.sender;

  // const {message, sender} = props;

  // if(sender === "robot"){
  //   return (
  //     <div>
  //       <img src="robot.png" width="50" alt="robot.png" />
  //       {message}
  //     </div>
  // );
  // }

  return (
    <div className={
      sender === "user"
      ? 'chat-message-user' 
      : 'chat-message-robot'
    }>
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" alt="robot.png" />
      )}
      {isLoading ? (
        <div className="loading-container">
          <img className= "loading-spinner" src="https://supersimple.dev/images/loading-spinner.gif" alt="Loading..." />
        </div>
      ):(
        <div className="chat-message-text">
            {message}
        </div>
      )}
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" alt="user.png" />
      )}
    </div>
  );
}