import React from 'react';
import { useNavigate } from 'react-router-dom';

type ProjectCardProps = {
  photo: string;
  name: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ photo, name }) => {
  const navigate = useNavigate();

  const clickProject = () => {
    navigate('/teams');
  };
  return (
    <div className="card user-card" onClick={clickProject}>
      <div className="card-body d-flex align-items-center">
        <div className="user-card__circle me-3">
          <img
            src={photo}
            alt={name}
            className="user-card__photo rounded-circle"
            style={{ width: '40px', height: '40px' }} // Tamaño personalizado para la imagen
          />
        </div>
        <div>
          <h5 className="card-title mb-0">{name}</h5>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
