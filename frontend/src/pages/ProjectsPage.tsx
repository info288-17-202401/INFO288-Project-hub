import React, { useEffect, useState } from 'react'
import Chat from '../components/chat/Chat'
import TeamCard from '../components/TeamCard'
import ChartsContainer from '../components/charts/ChartsContainer'
import Back from '../assets/Back'
import { useNavigate } from 'react-router-dom'
import { projectAuthStore, userAuthStore } from '../authStore'
import { toast } from 'sonner'
import { apiGetData, apiSendData } from '../services/apiService'
import { TeamsCardProps } from '../types/types'

const ProjectPage: React.FC = () => {
  const [dataTeams, setDataTeams] = useState<TeamsCardProps[]>([])
  const token_project = projectAuthStore.getState().token
  const token_user = userAuthStore.getState().token
  const [newTeamData, setNewTeamData] = useState({
    team_name: '',
    team_description: '',
    team_password: '',
  })
  const [showCreateTeamPopup, setShowCreateTeamPopup] = useState(false)

  const navigate = useNavigate()

  const fetchTeams = async () => {
    try {
      const route = `/project/${token_project}/teams`
      const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token_user}`,
      }
      const response = await apiGetData(route, header)

      if (response.ok) {
        console.log(token_project)
        setTimeout(async () => {
          toast.success('Equipos obtenidos exitosamente.')
        }, 700)
        const data = await response.json()
        setDataTeams(data)
      } else {
        toast.error('Error al obtener los equipos.')
      }
    } catch (e) {
      console.error('Error:', e)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  const createNewTeam = async () => {
    try {
      const route = `/team/create?project_auth_key=${token_project}&team_name=${newTeamData.team_name}&team_description=${newTeamData.team_description}&team_password=${newTeamData.team_password}`
      const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token_user}`,
      }
      const response = await apiSendData(route, header)
      if (response.ok) {
        toast.success('Equipo creado exitosamente.')
        fetchTeams()
        setShowCreateTeamPopup(false)
      } else {
        toast.error('Error al crear el equipo.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 58px)',
        marginTop: '58px',
      }}>
      <div
        className="mt-2 m-2"
        style={{
          flex: '0.7',
          overflowY: 'hidden',
          borderRight: '1px solid #e0e0e0',
        }}>
        <div className="d-flex align-items-center">
          <div className="m-2">
            <button
              className="btn p-0"
              onClick={() => navigate('/project-options')}>
              <Back size="36" color="#000" />
            </button>
          </div>
          <div className="w-100 mt-2 mb-2 me-2 text-center">
            <span className=" p-0">Volver a la página de opciones</span>
          </div>
        </div>
        <div className="d-flex my-2">
          <button
            type="submit"
            className="btn text-white w-100 mx-2"
            style={{ backgroundColor: '#202020' }}
            onClick={() => setShowCreateTeamPopup(true)}>
            Crear equipo
          </button>
        </div>
        <ul
          className="m-2 mt-2"
          style={{
            listStyle: 'none',
            padding: 0,
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 190px)',
          }}>
          {dataTeams.map((team: TeamsCardProps, index: number) => (
            <li className="" key={index}>
              <TeamCard team={team} colorRow={index % 2 ? '#fff' : '#f4f9ff'} />
            </li>
          ))}
        </ul>
      </div>
      {showCreateTeamPopup && (
        <div
          className="popup"
          style={{
            flex: '3',
            backgroundColor: '#282c34',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}>
          <div
            className="p-2 text-white d-flex flex-column p-5 rounded"
            style={{ backgroundColor: '#F9F9F9' }}>
            <input
              className='mt-3 rounded p-2 '
              type="text"
              value={newTeamData.team_name}
              onChange={(e) =>
                setNewTeamData({ ...newTeamData, team_name: e.target.value })
              }
              placeholder="Nombre del equipo"
            />
            <input
              type="text"
              className='mt-3 rounded p-2'
              value={newTeamData.team_description}
              onChange={(e) =>
                setNewTeamData({
                  ...newTeamData,
                  team_description: e.target.value,
                })
              }
              placeholder="Descripción del equipo"
            />
            <input
              className='mt-3 rounded p-2'
              type="password"
              value={newTeamData.team_password}
              onChange={(e) =>
                setNewTeamData({
                  ...newTeamData,
                  team_password: e.target.value,
                })
              }
              placeholder="Contraseña del equipo"
            />
            <div className='d-flex justify-content-end mt-4'>
              <button className='bg-black text-white rounded' 
                      onClick={createNewTeam}>
                        Crear 
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          flex: '3',

          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <div className="p-2  " style={{ flex: '1' }}>
          {/* <ChartsContainer /> */}
        </div>
        <div className="p-2  " style={{ flex: '1' }}>
          {/* <Chat /> */}
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
