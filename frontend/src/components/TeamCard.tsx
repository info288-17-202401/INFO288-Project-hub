import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectimg from '../assets/proyecto.png';
import { projectAuthStore } from '../authStore';
import { apiSendData } from '../services/apiService';

type TeamsCardProps = {
  team: {
    team_description: string;
    team_id: number;
    team_name: string;
    team_private: boolean;
  };
};

const TeamsCard: React.FC<TeamsCardProps> = ({ team }) => {
  const [showTeam, setShowTeam] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    team_id: team.team_id.toString(),
    password: '',
  });
  const navigate = useNavigate();
  const handleLoginTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.team_id || !data.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    try {
      const formData = new URLSearchParams();
      formData.append('username', data.team_id);
      formData.append('password', data.password);
      console.log(projectAuthStore.getState().token);

      const route = `/team/join`;
      const header = {'Content-Type': 'application/x-www-form-urlencoded'}
      const response = await apiSendData(route, header, formData.toString())

      if (response.ok) {
        const responseData = await response.json(); // Parsea la respuesta a JSON
        console.log(responseData);
      } else {
        console.error('Error al iniciar sesión:', response.statusText);
        setError('Credenciales inválidas. Por favor, intenta de nuevo.');
      }
    } catch (error: any) {
      console.error('Error de red:', error.message);
      setError(
        'Error de red. Por favor, revisa tu conexión e intenta de nuevo.'
      );
    }
  };

  const handleConfirm = () => {
    if (team.team_private) {
      console.log(data);
      //validar id, contraseña y hace el fetch
      // setShowTeam(false);
    } else {
      navigate('/teams');
      setShowTeam(false);
    }
  };

  return (
    <>
      <div className="position-relative">
        <div className="card user-card" onClick={() => setShowTeam(true)}>
          <div className="card-body d-flex align-items-center">
            <div className="user-card__circle me-3">
              <img
                src={projectimg}
                alt={team.team_name}
                className="user-card__photo rounded-circle"
                style={{ width: '40px', height: '40px' }}
              />
            </div>
            <div>
              <h5 className="card-title mb-0">{team.team_name}</h5>
            </div>
          </div>
        </div>
        {showTeam && (
          <div className="position-fixed top-0 start-0 h-100 w-100 d-flex justify-content-center align-items-center">
            <div
              className="bg-white rounded-2 p-1"
              style={{
                width: '25vw',
                height: '45vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="h-100">
                <div
                  className="rounded-2 p-4 text-light h-100"
                  style={{
                    backgroundColor: '#303339',
                    flex: '1 1 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div className="text-center">
                    <h3 className="text-center text-uppercase">
                      Ingresar al equipo
                    </h3>
                    <p className="text-uppercase">{team.team_name}</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">ID team</label>
                      <input
                        type="text"
                        name="team_id"
                        className="form-control"
                        value={team.team_id}
                        disabled
                      />
                    </div>
                    {team.team_private ? (
                      <>
                        <div className="mb-3">
                          <label className="form-label">Contraseña</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={handleLoginTeamChange}
                          />
                        </div>
                        {error && (
                          <p className="mt-3 text-center text-danger">
                            {error}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <div>
                          Descripcion del team al que me unire ! no pide
                          contraseña
                        </div>
                      </>
                    )}
                    <div className="button-container d-flex mt-3">
                      <button
                        type="submit"
                        className="btn text-white m-auto w-50 me-2"
                        style={{ backgroundColor: '#5864f2' }}
                        onClick={handleConfirm}
                      >
                        Confirmar
                      </button>
                      <button
                        type="submit"
                        className="btn text-white m-auto w-50 ms-2"
                        style={{ backgroundColor: '#5864f2' }}
                        onClick={() => setShowTeam(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamsCard;
