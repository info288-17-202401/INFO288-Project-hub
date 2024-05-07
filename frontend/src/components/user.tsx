import React from 'react';

type UserCardProps = {
  photo: string;
  name: string;
  status: 'active' | 'absent' | 'disconnected';
};

const UserCard: React.FC<UserCardProps> = ({ photo, name, status }) => {
  // Función para obtener el color del estado
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return 'green'; // Verde para activo
      case 'absent':
        return 'yellow'; // Amarillo para ausente
      case 'disconnected':
        return 'red'; // Rojo para desconectado
      default:
        return 'black'; // Color predeterminado
    }
  };

  return (
    <div className="card user-card">
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
          <p
            className="card-text mb-0"
            style={{ color: getStatusColor(status) }} // Color del texto según el estado
          >
            {status === 'active' && 'Active'}
            {status === 'absent' && 'Absent'}
            {status === 'disconnected' && 'Disconnected'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
