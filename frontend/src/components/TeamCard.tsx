import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img1 from '../assets/images/management_image.jpg'
import { projectAuthStore, teamAuthStore, userAuthStore } from '../authStore'
import { toast, Toaster } from 'sonner'
import { apiSendData } from '../services/apiService'

type TeamsCardProps = {
  team: {
    team_description: string
    team_id: number
    team_name: string
    team_private: boolean
  }
  colorRow: string
}

const TeamsCard: React.FC<TeamsCardProps> = ({ team, colorRow }) => {
  const [showTeam, setShowTeam] = useState(false)
  const [dataTeam, setDataTeam] = useState({
    team_id: team.team_id.toString(),
    password: '',
  })
  const setId = teamAuthStore((state) => state.setTeamId) // Obtén el método setToken del store
  const navigate = useNavigate()
  const handleLoginTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataTeam({
      ...dataTeam,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(dataTeam)

    e.preventDefault()
    if (team.team_private) {
      if (!dataTeam.team_id || !dataTeam.password) {
        toast.warning('Por favor, completa todos los campos.')
        return
      }
    }
    try {
      const route = `/team/join?team_id=${dataTeam.team_id}&team_password=${
        dataTeam.password
      }&project_auth_key=${projectAuthStore.getState().token}`
      const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userAuthStore.getState().token}`,
      }
      const response = await apiSendData(route, header)
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setId(team.team_id)

        setShowTeam(false)
        toast.success('Credenciales exitosas!.')
        handleSubmit
        setTimeout(() => {
          navigate('/teams')
        }, 500)
      } else {
        toast.error('Credenciales inválidas. Por favor, intenta de nuevo.')
      }
    } catch (e) {
      console.error('Error:', e)
    }
  }

  return (
    <>
      <div
        className="position-relative"
        style={{ backgroundColor: colorRow, borderBottom: '1px solid #e0e0e0' }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#dde8ff')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colorRow)}>
        <div onClick={() => setShowTeam(true)}>
          <div className="card-body d-flex align-items-center p-2">
            <img
              src={img1}
              onMouseOver={(e) => {
                e.currentTarget.style.border = '2px solid #007bff'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.border = 'none'
              }}
              style={{
                borderRadius: '50%',
                height: '50px',
                width: '50px',
                objectFit: 'cover',
                cursor: 'pointer',
                marginRight: '10px',
                transition: 'border 0.3s ease',
              }}
              className="img-fluid"
              alt="Project"
            />
            <div>
              <p className="fw-bold m-0 p-0">{team.team_name}</p>
              <p className="m-0 p-0 d-none d-md-table-cell">
                {team.team_description.length < 41
                  ? team.team_description
                  : team.team_description.slice(0, 47) + '...'}
              </p>
            </div>
          </div>
        </div>
        {showTeam && (
          <div className="position-fixed top-0 start-0 h-100 w-100 d-flex justify-content-center align-items-center">
            <div
              className="bg-white rounded-2 p-1"
              style={{
                width: '25vw',
                height: '40vh',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <div
                className="rounded-2 p-4"
                style={{
                  flex: '1 1 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <div className="text-left">
                  <h2 className="font-inter" style={{ fontSize: '2rem' }}>
                    ¡Ingresa al equipo!
                  </h2>
                  <p
                    className=" text-uppercase text-center pt-1"
                    style={{ fontSize: '1.1rem' }}>
                    {team.team_name}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3 d-flex">
                    <label className="form-label w-50 align-content-center  align-items-center ">
                      ID team:
                    </label>
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
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Contraseña"
                          onChange={handleLoginTeamChange}
                          style={{
                            backgroundColor: '#f8f8f8',
                            borderColor: 'white',
                          }}
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
                  <div className="d-flex mt-3">
                    <div className="w-50 me-2">
                      <button
                        type="submit"
                        className="btn text-white w-100"
                        style={{ backgroundColor: '#202020' }}>
                        Confirmar
                      </button>
                    </div>
                    <div className="w-50">
                      <button
                        type="button"
                        className="btn text-white w-100"
                        style={{ backgroundColor: '#202020' }}
                        onClick={() => setShowTeam(false)}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default TeamsCard
