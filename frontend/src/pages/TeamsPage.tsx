import React from 'react'
import UserCard from '../components/UserCard'
import ToDoContainer from '../components/toDo/TodoContainer'
import usercards from './userscards.json'
import Chat from '../components/chat/Chat'
import Back from '../assets/Back'
import { useNavigate } from 'react-router-dom'

const TeamsPage: React.FC = () => {
  const navigate = useNavigate()
  const clickButton = () => {
    navigate('/projects')
  }
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
          backgroundColor: '#21252b',
          overflowY: 'auto',
        }}>
        <div className="d-flex align-items-center">
          <div className="m-2">
            <button className="btn p-0" onClick={clickButton}>
              <Back size="36" color="#ffffff" />
            </button>
          </div>
          <div className="w-100 mt-2 mb-2 me-2 text-center">
            <span className="text-white p-0">
              Volver a la pagina de proyectos
            </span>
          </div>
        </div>
        <hr className=" border-top b-0 p-0 m-0 ms-2 me-2 bg-white" />
        <ul className="p-2 m-1" style={{ listStyle: 'none', padding: 0 }}>
          {usercards.map((user, index) => (
            <li className="mb-3" key={index}>
              <UserCard name={user.name} photo={user.photo} />
            </li>
          ))}
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
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default TeamsPage
