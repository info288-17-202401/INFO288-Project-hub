import React, { useEffect } from 'react'

type MessageProps = {
  message_text: string
  user_name: string
  user_email: string
  date: string
}

const Message: React.FC<MessageProps> = ({
  message_text,
  user_name,
  user_email,
  date,
}) => {
  return (
    <div
      className="container mt-2 p-2 pb-0 align-content-center border rounded"
      style={{ borderTop: '0.3px solid rgba(255,255,255,0.5)' }}>
      <div className="pb-2">
        <span className="me-2">
          <strong style={{ color: '#404fed' }}>{user_name}</strong>
          <strong className='mx-3' style={{ color: '#404fed' }}>{user_email}</strong>

        </span>
        <span className="">{date}</span>
      </div>
      <div className="">
        <p>{message_text}</p>
     
      </div>
    </div>
  )
}

export default Message
