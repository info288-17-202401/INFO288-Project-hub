import React, { useState, useEffect } from 'react'
import Message from './Message'
import messagesData from './messages.json' // Importar el archivo JSON
import { toast, Toaster } from 'sonner'
import { apiGetData } from '../../services/apiService'
import { projectAuthStore, teamAuthStore, userAuthStore } from '../../authStore'

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    setMessages(messagesData)
    const intervalId = setInterval(fetchMessages, 50000)
    return () => clearInterval(intervalId)
  }, [])

  const fetchMessages = async () => {
    const teamId = teamAuthStore.getState().team_id
    const token_project = projectAuthStore.getState().token
    const token_user = userAuthStore.getState().token

    console.log(teamId)
    console.log(token_project)

    try {
      const route = `/team/${teamId}/messages/?project_auth_key=${token_project}`

      const header = {
        Authorization: `Bearer ${token_user}`,
        'Content-Type': 'application/json',
      }

      const response = await apiGetData(route, header)
      if (response.ok) {
        console.log(response)
      } else {
        toast.error('Credenciales inválidas. Por favor, intenta de nuevo.')
      }
    } catch (e) {
      toast.warning(
        'Error de red. Por favor, revisa tu conexión e intenta de nuevo.'
      )
    }
  }

  const clickButton = () => {
    alert('Mensaje enviado')
  }

  return (
    <div className="">
      <div
        className=" "
        style={{
          height: '36vh',
          overflowY: 'auto', // Agregamos desbordamiento vertical para asegurar que todos los mensajes sean visibles
          overflowX: 'hidden',
        }}>
        <div className="d-flex m-4">
          <div className="align-content-center ">
            {messages.map((message, index) => (
              <Message
                key={index}
                user_name={message.user_name}
                user_email={message.user_email}
                message_text={message.message_text}
                date={message.date}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex ps-3 pe-2 pt-4">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Ingresa tu mensaje!"
        />

        <button
          type="submit"
          className="btn text-white "
          style={{ backgroundColor: '#5864f2' }}
          onClick={clickButton}>
          enviar
        </button>
      </div>
      <Toaster richColors />
    </div>
  )
}

export default Chat
