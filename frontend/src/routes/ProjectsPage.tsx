import React from 'react';
import projectcards from './projectcards.json';
import Chat from '../components/Chat';
import ProjectCard from '../components/ProjectCard';
import projectimg from '../assets/proyecto.png';
import ChartsContainer from '../components/ChartsContainer';
import Back from '../assets/Back';
import { useNavigate } from 'react-router-dom';

const ProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const clickButton = () => {
    navigate('/project-options');
  };

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
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
              Volver a la pagina de opciones
            </span>
          </div>
        </div>
        <hr className=" border-top b-0 p-0 m-0 ms-2 me-2 bg-white" />
        <ul className="p-2 m-1" style={{ listStyle: 'none', padding: 0 }}>
          {projectcards.map((user, index) => (
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
            graficar tareas realizadas por cada team/completadas o pendientes
            {/* <ChartsContainer data={data} options={options} /> */}
            <input className="form-check-input p-1 m-2" type="checkbox" />
            <span>
              boton para luego de elegir team volver a la pantalla anterior
              donde aparece la lista de teams
            </span>
            <span>terminar to-do list</span>
            <span>
              terminar enlace de mensajes y poder enviar mensajes desde el input
              y que se vean en el chat general
            </span>
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
