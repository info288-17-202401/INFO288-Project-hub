import { useState } from 'react';
import Back from '../assets/Back';
import { projectAuthStore, userAuthStore } from './authStore';
import { useNavigate } from 'react-router-dom';

const JoinProject: React.FC<{ onReturn: () => void }> = ({ onReturn }) => {
  const [error, setError] = useState('');
  const setToken = projectAuthStore((state) => state.setToken); // Obtén el método setToken del store
  const setTokenType = projectAuthStore((state) => state.setTokenType); // Obtén el método setUserType del store

  const navigate = useNavigate();

  const [joinProjectData, setJoinProjectData] = useState({
    project_id: '',
    project_password: '',
  });

  const handleJoinProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinProjectData({
      ...joinProjectData,
      [e.target.name]: e.target.value,
    });
  };

  const clickButton = () => {
    const token = userAuthStore.getState().token;

    if (!joinProjectData.project_id || !joinProjectData.project_password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setError('');
    const url = `http://localhost:8000/project/auth?project_id=${joinProjectData.project_id}&project_password=${joinProjectData.project_password}`;

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setToken(data.access_token); // Almacena el token en el store
        setTokenType(data.token_type); // Almacena el tipo de token en el store
        console.log('Te has unido al proyecto correctamente.');
        navigate('/teams');
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log('Ocurrió un error al crear el proyecto.');
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
            <label className="form-label">Id del proyecto</label>
            <input
              onChange={handleJoinProjectChange}
              type="text"
              name="project_id"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              onChange={handleJoinProjectChange}
              type="password"
              name="project_password"
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
function joinAuthStore(arg0: (state: any) => any) {
  throw new Error('Function not implemented.');
}
