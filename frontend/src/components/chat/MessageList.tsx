import React, { useEffect, useRef } from 'react'
import { MessageProps } from '../../types/types'
import Message from './Message'

type MessageListProps = {
  messages: MessageProps[]
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => { // Componente que representa la lista de mensajes
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { // Actualiza la lista de mensajes si hay cambios en el arreglo de mensajes
    console.log('Messages have been updated:', messages)
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => { // Desplaza la lista de mensajes al final
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  // ordenar por id messages messages_id
  const sortMessages = messages.sort((a, b) => a.message_id - b.message_id)

  return (
    <div>
      {sortMessages.map((message, index) => (
        <Message
          key={index}
          user_name={message.app_user_name}
          user_email={message.app_user_email}
          message_text={message.message_content}
          date={message.message_date}
          colorRow={index % 2 ? '#fff' : '#f4f9ff'}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
