import React, { useState, useEffect } from 'react'
import Message from './Message'
import messagesData from './messages.json' // Importar el archivo JSON
import { toast, Toaster } from 'sonner'
import { apiGetData } from '../../services/apiService'
import { projectAuthStore, teamAuthStore, userAuthStore } from '../../authStore'
import Send from '../../assets/Send'

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([])
  const [hover, setHover] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message) {
      toast.warning('Por favor, Escribe un mensaje.')
      return
    }

    console.log(message)
  }
  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }
  useEffect(() => {
    setMessages(messagesData)
    const intervalId = setInterval(fetchMessages, 50000)
    return () => clearInterval(intervalId)
  }, [])

  const fetchMessages = async () => {
    const teamId = teamAuthStore.getState().team_id
    const token_project = projectAuthStore.getState().token
    const token_user = userAuthStore.getState().token

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

  return (
    <div className="">
      <div
        className=" "
        style={{
          height: '36vh',
          overflowY: 'auto',
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
      <form onSubmit={handleSubmit} className="d-flex ps-3 pe-2 pt-4">
        <input
          className="form-control me-2"
          style={{ backgroundColor: '#f8f8f8', borderColor: 'white' }}
          type="text"
          onChange={handleMessage}
          placeholder="Ingresa tu mensaje!"
        />
        <button
          className="bg-transparent border-0"
          type="submit"
          onMouseOver={(e) => (
            (e.currentTarget.style.transform = 'scale(1.1)'),
            setHover(true),
            (e.currentTarget.style.transform = 'scale(-1.1)')
          )}
          onMouseOut={(e) => (
            (e.currentTarget.style.transform = 'scale(1)'), setHover(false)
          )}>
          <Send size="40" color={hover ? '#74bff6' : '#333'} />
        </button>
      </form>

      <Toaster richColors />
    </div>
  )
}

export default Chat
