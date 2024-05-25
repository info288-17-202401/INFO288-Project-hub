import React, { useEffect, useRef } from 'react'
import { MessageProps } from '../../types/types'
import Message from './Message'


type MessageListProps = {
  messages: MessageProps[]
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('Messages have been updated:', messages);
        scrollToBottom();

    }, [messages]);
    
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
    

  return (
    <div className="align-content-center ">
    {messages.map((message, index) => (
      <Message
        key={index}
        user_name={message.app_user_name}
        user_email={message.app_user_email}
        message_text={message.message_content}
        date={message.message_date}
      />
    ))}
    <div ref={messagesEndRef} />

  </div>
  )
}

export default MessageList
