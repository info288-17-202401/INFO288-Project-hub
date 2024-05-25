import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import ToDoContainer from '../components/toDo/TodoContainer'
import Chat from '../components/chat/Chat'
import Back from '../assets/Back'
import { useNavigate } from 'react-router-dom'
import { projectAuthStore, teamAuthStore, userAuthStore } from '../authStore'
import { apiGetData } from '../services/apiService'
import { toast } from 'sonner'
import {rabbitUnsubscribeChannel, client, rabbitSubscribeChannel} from '../services/rabbitMQService'
import TeamUserList from '../components/team/TeamUserList'
import { UserProps } from '../types/types'



const TeamsPage: React.FC = () => {
  const navigate = useNavigate()
  const teamId = teamAuthStore.getState().team_id
  const token_user = userAuthStore.getState().token
  const token_project = projectAuthStore.getState().token
  const [sessionUsers, setSessionUsers] = useState<UserProps[]>([])


  const clickButton = () => {
    navigate('/projects')
  }

  const fetchTeamUsers = async () => {
    try {
      const route = `/team/${teamId}/users?project_auth_key=${token_project}`
      const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token_user}`,
      }
      const response = await apiGetData(route, header)

      if (response.ok) {
        setTimeout(async () => {
          toast.success('Usuarios obtenidos exitosamente.')
        }, 700)
        const data = await response.json()
        setSessionUsers(data)
        return data
      } else {
        toast.error('Error al obtener los usuarios.')
      }
    } catch (e) {
      console.error('Error:', e)
    }
  }

  
  const onMessageReceived = async(body: any) => {
    const messageObject = JSON.parse(body);
    const newUser : UserProps = {
      'app_user_name': messageObject.app_user_name,
      'app_user_email': messageObject.app_user_email,
      'app_user_id': messageObject.app_user_id,
      'user_status': messageObject.user_status
    }
    if(newUser.user_status == 'connected'){
      setSessionUsers(prevUsers => [...prevUsers, newUser]);
    }else if (newUser.user_status == 'disconnected') {
      setSessionUsers(prevUsers => prevUsers.filter(user => user.app_user_id !== newUser.app_user_id));
    }
}

  useEffect(() => {
    fetchTeamUsers();

    return () => {
      if (client && client.connected) {
        rabbitUnsubscribeChannel('users_team_' + teamId)
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
          <TeamUserList sessionUsers={sessionUsers}></TeamUserList>
      </div>
      <div
        style={{
          flex: '3',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <div className="p-2 text-white " style={{ flex: '1' }}>
          <ToDoContainer />
        </div>
        <div className="p-2 " style={{ flex: '1' }}>
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default TeamsPage
