import { useState } from 'react';
import Back from '../assets/Back';
import { useAuthStore } from './authStore';

const JoinProject: React.FC<{ onReturn: () => void }> = ({ onReturn }) => {
  const [error, setError] = useState('');

  const [joinProjectData, setJoinProjectData] = useState({
    token: '',
    password: '',
  });

  const handleJoinProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinProjectData({
      ...joinProjectData,
      [e.target.name]: e.target.value,
    });
  };
  const clickButton = () => {
    const token = useAuthStore.getState().token;

    if (!joinProjectData.token || !joinProjectData.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setError('');
    fetch('http://localhost:8000/project/auth', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(joinProjectData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Proyecto creado correctamente.');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Ocurrió un error al crear el proyecto.');
      });
  };
  return (
    <div
      className="text-light p-4 container d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <div
        className="card p-4  text-light"
        style={{ backgroundColor: '#303339', width: '50%' }}
      >
        <div className="d-flex justify-content-between align-items-center m-auto mb-4">
          <button className="btn p-0 m-2 border-0" onClick={onReturn}>
            <Back />
          </button>
          <h1 className="text-center text-uppercase m-0">
            Unirse a un proyecto
          </h1>
        </div>
        <form>
          <div className="mb-3">
            <label className="form-label">Token de acceso</label>
            <input
              onChange={handleJoinProjectChange}
              type="text"
              name="token"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              onChange={handleJoinProjectChange}
              type="password"
              name="password"
              className="form-control"
            />
          </div>
        </form>
        <div style={{ width: '100%' }}>
          <button
            type="submit"
            className="btn text-white w-100"
            style={{ backgroundColor: '#5864f2' }}
            onClick={clickButton}
          >
            Unirse
          </button>
          {error && <p className="mt-3 text-center text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default JoinProject;
