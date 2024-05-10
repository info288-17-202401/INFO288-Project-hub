import React, { useState } from 'react';
import CreateProject from '../components/CreateProject';
import JoinProject from '../components/JoinProject';

type ProjectOptionsPageButtonProps = {
  type: string;
  onClick: () => void;
};

const ProjectOptionsPageButton: React.FC<ProjectOptionsPageButtonProps> = ({
  type,
  onClick,
}) => {
  return (
    <>
      <button
        type="submit"
        className="btn text-white p-2 m-2"
        style={{ backgroundColor: '#5864f2' }}
        onClick={onClick}
      >
        {type}
      </button>
    </>
  );
};

const ProjectOptionsPage: React.FC = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showJoinProject, setShowJoinProject] = useState(false);

  const handleCreateProjectClick = () => {
    setShowCreateProject(true);
    setShowJoinProject(false); // Asegúrate de ocultar el componente de inicio de sesión si se muestra
  };

  const handleJoinProjectClick = () => {
    setShowJoinProject(true);
    setShowCreateProject(false); // Asegúrate de ocultar el componente de creación de equipo si se muestra
  };

  const handleReturn = () => {
    setShowCreateProject(false);
    setShowJoinProject(false);
  };

  return (
    <div
      className="text-light p-4 container d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      {showCreateProject && <CreateProject onReturn={handleReturn} />}
      {showJoinProject && <JoinProject onReturn={handleReturn} />}
      {!showCreateProject && !showJoinProject && (
        <div
          className="card p-4 text-light"
          style={{ backgroundColor: '#303339', width: '50%' }}
        >
          <h1 className="text-center text-uppercase">Selecciona</h1>
          <ProjectOptionsPageButton
            type="Crear un proyecto"
            onClick={handleCreateProjectClick}
          />
          <ProjectOptionsPageButton
            type="Unirse a un proyecto"
            onClick={handleJoinProjectClick}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectOptionsPage;
