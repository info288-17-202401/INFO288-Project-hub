import React, { useState, useEffect } from 'react';
import Message from './Message';
import messagesData from './messages.json'; // Importar el archivo JSON

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages(messagesData);
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = () => {};

  const clickButton = () => {
    alert('Mensaje enviado');
  };

  return (
    <div className="">
      <div
        className=" "
        style={{
          height: '36vh',
          overflowY: 'auto', // Agregamos desbordamiento vertical para asegurar que todos los mensajes sean visibles
          overflowX: 'hidden',
        }}
      >
        <div className="d-flex m-4">
          <div className="align-content-center ">
            {messages.map((message, index) => (
              <Message
                key={index}
                user_name={message.user_name}
                user_email={message.user_email}
                message_text={message.message_text}
                date={message.date}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex ps-3 pe-2 pt-4">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Ingresa tu mensaje!"
        />

        <button
          type="submit"
          className="btn text-white "
          style={{ backgroundColor: '#5864f2' }}
          onClick={clickButton}
        >
          enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
