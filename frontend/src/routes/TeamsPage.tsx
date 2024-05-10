import React from 'react';
import UserCard from '../components/UserCard';
import ToDoContainer from '../components/TodoContainer';
import usercards from './userscards.json';
import Chat from '../components/Chat';
import Back from '../assets/Back';
import { useNavigate } from 'react-router-dom';

const TeamsPage: React.FC = () => {
  const navigate = useNavigate();
  const clickButton = () => {
    navigate('/projects');
  };
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 58px)' }}>
      <div
        style={{
          flex: '0.7',
          backgroundColor: '#21252b',
        }}
      >
        <div className="d-flex align-items-center">
          <div className="m-2">
            <button className="btn p-0" onClick={clickButton}>
              <Back />
            </button>
          </div>
          <div className="w-100 mt-2 mb-2 me-2 text-center">
            <span className="text-white p-0">
              Volver a la pagina de proyectos
            </span>
          </div>
        </div>
        <hr className=" border-top b-0 p-0 m-0 ms-2 me-2 bg-white" />

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
