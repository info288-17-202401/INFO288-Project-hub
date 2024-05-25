import React, { useEffect } from 'react'
import UserCard from '../components/UserCard'
import ToDoContainer from '../components/toDo/TodoContainer'
import Chat from '../components/chat/Chat'
import Back from '../assets/Back'
import { useNavigate } from 'react-router-dom'
import { teamAuthStore, userAuthStore } from '../authStore'
import { apiGetData } from '../services/apiService'
import { toast } from 'sonner'
import {rabbitSubscribeChannel, rabbitUnsubscribeChannel, client} from '../services/rabbitMQService'

const TeamsPage: React.FC = () => {
  const navigate = useNavigate()
  const teamId = teamAuthStore.getState().team_id
  const token_user = userAuthStore.getState().token

  const clickButton = () => {
    navigate('/projects')
  }

  const fetchTeamUsers = async () => {
    try {
      const route = `/team/${teamId}/users`
      const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token_user}`,
      }
      const response = await apiGetData(route, header)

      if (response.ok) {
        setTimeout(async () => {
          toast.success('Equipos obtenidos exitosamente.')
        }, 700)
        const data = await response.json()
        console.log(data)
      } else {
        toast.error('Error al obtener los equipos.')
      }
    } catch (e) {
      console.error('Error:', e)
    }
  }

  useEffect(() => {
    // fetchTeamUsers();
    rabbitSubscribeChannel('messages_team_' + teamId)

    return () => {
      if (client && client.connected) {
        rabbitUnsubscribeChannel('messages_team_' + teamId)
      }
    }
  }, []);


  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 58px)',
        marginTop: '58px',
      }}>
      <div
        style={{
          flex: '0.7',

          overflowY: 'auto',
        }}>
        <div className="d-flex align-items-center">
          <div className="m-2">
            <button className="btn p-0" onClick={clickButton}>
              <Back size="36" color="#000" />
            </button>
          </div>
          <div className="w-100 mt-2 mb-2 me-2 text-center">
            <span className=" p-0">Volver a la pagina de proyectos</span>
          </div>
        </div>
        <hr className="m-0 mx-2" style={{ borderTop: '1.5px solid #000' }} />
        <ul className="p-2 m-1" style={{ listStyle: 'none', padding: 0 }}>
          {/* {usercards.map((user, index) => (
            <li className="mb-3" key={index}>
              <UserCard name={user.name} photo={user.photo} />
            </li>
          ))} */}
        </ul>
      </div>
      <div
        style={{
          flex: '3',
          backgroundColor: '#282c34',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <div className="p-2 text-white " style={{ flex: '1' }}>
          <ToDoContainer />
        </div>

        <div className="p-2 " style={{ flex: '1' }}>
          {/* <Chat /> */}
        </div>
      </div>
    </div>
  )
}

export default TeamsPage
