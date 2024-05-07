import React from 'react';
import UserCard from '../components/user';

const ProjectTeamPage: React.FC = () => {
  return (
    <div className="" style={{ display: 'flex', height: '90vh' }}>
      <div style={{ flex: '1', borderRight: '1px solid #ccc' }}>
        <ul className="p-2 m-1" style={{ listStyle: 'none', padding: 0 }}>
          <li className="mb-3">
            <UserCard
              name="Monkey D. Luffy"
              status="active"
              photo="https://fanservice.es/wp-content/uploads/2024/03/luffy.jpg"
            />
          </li>
          <li className="mb-3">
            <UserCard
              name="Monkey D. Luffy"
              status="disconnected"
              photo="https://fanservice.es/wp-content/uploads/2024/03/luffy.jpg"
            />
          </li>
          <li className="mb-3">
            <UserCard
              name="Monkey D. Luffy"
              status="active"
              photo="https://fanservice.es/wp-content/uploads/2024/03/luffy.jpg"
            />
          </li>
          <li className="mb-3">
            <UserCard
              name="Monkey D. Luffy"
              status="active"
              photo="https://fanservice.es/wp-content/uploads/2024/03/luffy.jpg"
            />
          </li>
        </ul>
      </div>
      <div style={{ flex: '3', paddingLeft: '10px', paddingRight: '10px' }}>
        <div
          className="p-2 d-flex flex-column justify-content-between h-100 "
          style={{ border: '1px solid #ccc', padding: 0 }}
        >
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Message 1</li>
            <li>Message 2</li>
            <li>Message 3</li>
          </ul>

          <div className="container d-flex">
            <input
              className="form-control mb-2 me-1"
              type="text"
              placeholder="Ingresa tu mensaje!"
            />
            <button className="btn btn-primary">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTeamPage;
