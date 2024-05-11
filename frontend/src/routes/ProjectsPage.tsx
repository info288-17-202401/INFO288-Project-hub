import React, { useEffect, useState } from 'react';
import Chat from '../components/Chat';
import TeamCard from '../components/TeamCard';
import ChartsContainer from '../components/ChartsContainer';
import Back from '../assets/Back';
import { useNavigate } from 'react-router-dom';
import { projectAuthStore, userAuthStore } from '../authStore';

type TeamsCardProps = {
  team_description: string;
  team_id: number;
  team_name: string;
  team_private: boolean;
};

const ProjectPage: React.FC = () => {
  const [dataTeams, setDataTeams] = useState<TeamsCardProps[]>([]);

  const navigate = useNavigate();
  const clickButton = () => {
    navigate('/project-options');
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token_project = projectAuthStore.getState().token;
        const token_user = userAuthStore.getState().token;

        const response = await fetch(
          `http://localhost:8000/project/${token_project}/teams`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token_user}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error en la solicitud fetch');
        }

        const data = await response.json();
        setDataTeams(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
        console.log('Ocurrió un error al obtener los equipos.');
      }
    };

    fetchTeams();
  }, [projectAuthStore.getState().token]);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 58px)' }}>
      <div
        style={{
          flex: '0.7',
          backgroundColor: '#21252b',
          overflowY: 'auto',
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
              Volver a la página de opciones
            </span>
          </div>
        </div>
        <hr className=" border-top b-0 p-0 m-0 ms-2 me-2 bg-white" />
        <ul className="p-2 m-1" style={{ listStyle: 'none', padding: 0 }}>
          {dataTeams.map((team: TeamsCardProps, index: number) => (
            <li className="mb-3" key={index}>
              <TeamCard team={team} />
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          flex: '3',
          backgroundColor: '#282c34',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="p-2 text-white " style={{ flex: '1' }}>
          <ChartsContainer />
        </div>

        <div className="p-2 " style={{ flex: '1' }}>
          {/* <Chat /> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
