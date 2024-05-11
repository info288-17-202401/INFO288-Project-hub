import React, { useEffect, useState } from 'react';
import { userAuthStore } from '../authStore';

const MyProjectsPage: React.FC = () => {
  const [dataProjects, setDataProjects] = useState([]);
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token_user = userAuthStore.getState().token;

        const response = await fetch(
          `http://localhost:8000/project/${token_user}/projects`,
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
        setDataProjects(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
        console.log('Ocurrió un error al obtener los equipos.');
      }
    };

    fetchTeams();
  }, [userAuthStore.getState().token]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Mis proyectos</h2>
            </div>
            <div className="list-group">
              {dataProjects.map((project) => (
                <div key={project.project_id}>{project.project_name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectsPage;
