import { useState } from "react"
import { apiSendData } from '../services/apiService'
import { toast } from 'sonner'

type TeamCreationPopUpProps = {
  token_project: string
  token_user: string
}

const TeamCreationPopUp: React.FC<TeamCreationPopUpProps> = ({token_project, token_user }) => {

    const [newTeamData, setNewTeamData] = useState({
        team_name: '',
        team_description: '',
        team_password: '',
      })
      
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
          } else {
            toast.error('Error al crear el equipo.')
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }

  return (
    <div>
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
            className="p-2 text-white d-flex  "
            style={{ backgroundColor: '#F9F9F9' }}>
            <input
              type="text"
              value={newTeamData.team_name}
              onChange={(e) =>
                setNewTeamData({ ...newTeamData, team_name: e.target.value })
              }
              placeholder="Nombre del equipo"
            />
            <input
              type="text"
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
            <button onClick={createNewTeam}>Crear equipo</button>
          </div>
        </div>
    </div>
  )
}

export default TeamCreationPopUp
