import React from 'react'

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
      className="container mt-2 p-2 pb-0 align-content-center"
      style={{ borderTop: '0.3px solid rgba(255,255,255,0.5)' }}>
      <div className="pb-2">
        <span className="me-2">
          <strong style={{ color: '#404fed' }}>{user_name}</strong>
        </span>
        <span className="">{date}</span>
      </div>
      <div className="">
        <p>{message_text}</p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit rerum,
          porro illo fuga veniam voluptates amet enim aliquid error magnam harum
          mollitia sunt in ad? Non, impedit! Asperiores pariatur hic
          perferendis. Error voluptatibus dolores sit officia nihil repellendus
          beatae natus, quo adipisci? Hic nisi dignissimos dolorem quae quos,
          nemo veniam dicta eius doloremque blanditiis porro eligendi temporibus
          ipsa quam pariatur, quaerat obcaecati, molestiae alias ad magni. Magni
          deleniti, incidunt, consectetur ipsa voluptates ad sunt provident unde
          nisi distinctio quidem voluptatum dolores reprehenderit esse hic vero
          quos expedita eum? Quas iure eos quo nihil animi voluptatem earum
          doloribus qui a quos.
        </p>
      </div>
    </div>
  )
}

export default Message
