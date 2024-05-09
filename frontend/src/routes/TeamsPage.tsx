import React from 'react';
import UserCard from '../components/UserCard';
import ToDoContainer from '../components/TodoContainer';
import usercards from './userscards.json';
import Chat from './Chat';

const TeamsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 58px)' }}>
      <div
        style={{
          flex: '0.7',
          backgroundColor: '#21252b',
        }}
      >
        <ul className="p-2 m-1" style={{ listStyle: 'none', padding: 0 }}>
          {usercards.map((user, index) => (
            <li className="mb-3" key={index}>
              <UserCard
                name={user.name}
                status={user.status as 'active' | 'absent' | 'disconnected'} // Cast the status prop to the correct type
                photo={user.photo}
              />
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          flex: '3',
          backgroundColor: '#282c34',
        }}
      >
        <div className="p-2 d-flex flex-column justify-content-between m-0 p-0 h-100 ">
          <div className="m-1 p-0">
            <ToDoContainer />
          </div>
          <div className="p-2 m-1">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
