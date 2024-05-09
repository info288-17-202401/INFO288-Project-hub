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

  const fetchMessages = () => {
    // Aquí podrías realizar la lógica para actualizar los mensajes, si lo necesitas
    // Por ejemplo, podrías hacer una solicitud HTTP como lo hacías antes
  };

  const clickButton = () => {
    alert('Mensaje enviado');
  };

  return (
    <div className=" ">
      <div
        className="d-flex m-4"
        style={{
          height: '30vh',
          overflowY: 'auto', // Agregamos desbordamiento vertical para asegurar que todos los mensajes sean visibles
          overflowX: 'hidden',
          marginTop: '10px', // Ajustamos el margen superior para separar el primer mensaje del borde superior del contenedor
        }}
      >
        <ul
          className="align-content-center w-100 p-2"
          style={{ listStyle: 'none', padding: 0 }}
        >
          {messages.map((message, index) => (
            <Message
              key={index}
              user_name={message.user_name}
              user_email={message.user_email}
              message_text={message.message_text}
              date={message.date}
            />
          ))}
        </ul>
      </div>
      <div className="d-flex">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Ingresa tu mensaje!"
        />
        <button onClick={clickButton} className="btn btn-primary">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
