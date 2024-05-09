import React from 'react';
import usercards from './projectcards.json';
import Chat from '../components/Chat';
import ProjectCard from '../components/ProjectCard';
import projectimg from '../assets/proyecto.png';

const ProjectPage: React.FC = () => {
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
              <ProjectCard name={user.name} photo={projectimg} />
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
          <div className="m-1 p-0 text-white">
            <h1 className="text-white text-center">GRAFICOS</h1>
            <input className="form-check-input p-1 m-2" type="checkbox" />
            <span>
              boton para luego de elegir team volver a la pantalla anterior
              donde aparece la lista de teams
            </span>
            <input className="form-check-input p-1 m-2" type="checkbox" />
            <span>
              graficar tareas realizadas por cada team/completadas o pendientes
            </span>
            <input className="form-check-input p-1 m-2" type="checkbox" />
            <span>terminar to-do list</span>
            <input className="form-check-input p-1 m-2" type="checkbox" />
            <span>
              terminar enlace de mensajes y poder enviar mensajes desde el input
              y que se vean en el chat general
            </span>
            <input className="form-check-input p-1 m-2" type="checkbox" />
            <span>hacer chat de team</span>
          </div>

          <div className="p-2 m-1">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
