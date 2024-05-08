import { useAuthStore } from './authStore';
import Back from '../assets/Back';
import { useState } from 'react';

const CreateProject: React.FC<{ onReturn: () => void }> = ({ onReturn }) => {
  const [error, setError] = useState('');

  const [createProjectData, setCreateProjectData] = useState({
    name: '',
    password: '',
    description: '',
  });

  const handleCreateDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCreateProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clickButton = () => {
    const token = useAuthStore.getState().token;

    if (
      !createProjectData.name ||
      !createProjectData.password ||
      !createProjectData.description
    ) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setError('');
    fetch('http://localhost:8000/project/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createProjectData),
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
        className="card p-4 text-light"
        style={{ backgroundColor: '#303339', width: '50%' }}
      >
        <div className="d-flex justify-content-between align-items-center m-auto mb-4">
          <button className="btn p-0 border-0 m-2 " onClick={onReturn}>
            <Back />
          </button>
          <h1 className="text-center text-uppercase m-0">Crear un proyecto</h1>
        </div>
        <form>
          <div className="mb-3">
            <label className="form-label">Nombre del proyecto</label>
            <input
              onChange={handleCreateDataChange}
              type="text"
              name="name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              onChange={handleCreateDataChange}
              type="password"
              name="password"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripcion</label>
            <textarea
              onChange={handleCreateDataChange}
              className="form-control"
              name="description"
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
            Crear
          </button>
          {error && <p className="mt-3 text-center text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
