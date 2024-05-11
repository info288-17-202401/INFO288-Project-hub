import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectimg from '../assets/proyecto.png';

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
  const [data, setData] = useState({
    id_team: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.id_team || !data.password) {
      // setError('Por favor, completa todos los campos.');
      return;
    }
  };
  const handleConfirm = () => {
    console.log('Confirmado');
    if (team.team_private) {
      //validar id, contraseña y hace el fetch
      setShowTeam(false);
      return;
    }

    navigate('/teams');
    setShowTeam(false);
  };

  return (
    <div className="position-relative">
      <div className="card user-card" onClick={() => setShowTeam(true)}>
        <div className="card-body d-flex align-items-center">
          <div className="user-card__circle me-3">
            <img
              src={projectimg}
              alt={team.team_name}
              className="user-card__photo rounded-circle"
              style={{ width: '40px', height: '40px' }} // Tamaño personalizado para la imagen
            />
          </div>
          <div>
            <h5 className="card-title mb-0">{team.team_name}</h5>
          </div>
        </div>
      </div>
      {showTeam && (
        <div className="position-fixed top-0 start-0 h-100 w-100 d-flex justify-content-center align-items-center">
          <div className="bg-white rounded-2 p-2 ">
            <div>
              <div
                className="card p-4  text-light"
                style={{ backgroundColor: '#303339' }}
              >
                <div className="text-center">
                  <h3 className="text-center text-uppercase">
                    Ingresar al equipo
                  </h3>
                  <p className="text-uppercase">{team.team_name}</p>
                </div>
                <form onSubmit={handleSubmit}>
                  {team.team_private ? (
                    <>
                      <div className="mb-3">
                        <label className="form-label">ID team</label>
                        <input
                          type="text"
                          name="id_team"
                          className="form-control"
                          // onChange={handleLoginPageChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          // onChange={handleLoginPageChange}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        Descripcion del team al que me unire ! no pide
                        contraseña
                      </div>
                    </>
                  )}
                  <div className="button-container d-flex">
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

                  {/* {error && <p className="mt-3 text-center text-danger">{error}</p>} */}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsCard;
