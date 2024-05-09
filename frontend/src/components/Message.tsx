import React from 'react';

type MessageProps = {
  message_text: string;
  user_name: string;
  user_email: string;
  date: string;
};

const Message: React.FC<MessageProps> = ({
  message_text,
  user_name,
  user_email,
  date,
}) => {
  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          <div className="user-info">
            <span className="me-2">
              <strong>{user_name}</strong>
            </span>
            <span className="me-2">{user_email}</span>
            <span className="text-muted">{date}</span>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{message_text}</p>
        </div>
      </div>
    </>
  );
};

export default Message;
