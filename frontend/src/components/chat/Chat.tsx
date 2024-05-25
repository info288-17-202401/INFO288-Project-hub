import React, { useState, useEffect } from 'react'
import Message from './Message'
import { toast, Toaster } from 'sonner'
import { apiGetData, apiSendData } from '../../services/apiService'
import { projectAuthStore, teamAuthStore, userAuthStore } from '../../authStore'
import Send from '../../assets/Send'
import {rabbitSubscribeChannel, rabbitUnsubscribeChannel, client} from '../../services/rabbitMQService'
import { MessageProps } from '../../types/types'
import MessageList from './MessageList'



const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [hover, setHover] = useState(false)
  const [message, setMessage] = useState('')
  const teamId = teamAuthStore.getState().team_id
  const token_project = projectAuthStore.getState().token
  const token_user = userAuthStore.getState().token
  const user_email = userAuthStore.getState().email


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


  const fetchMessages = async () => {
    const teamId = teamAuthStore.getState().team_id
    const token_project = projectAuthStore.getState().token
    const token_user = userAuthStore.getState().token

    try {
      const route = `/team/${teamId}/messages?project_auth_key=${token_project}`

      const header = {
        Authorization: `Bearer ${token_user}`,
        'Content-Type': 'application/json',
      }

      const response = await apiGetData(route, header)
      if (response.ok) {
        console.log(token_project)
        setTimeout(async () => {
          toast.success('Equipos obtenidos exitosamente.')
        }, 700)
        const data = await response.json()
        console.log(data)
        setMessages(data)
      } else {
        toast.error('Error al obtener los equipos.')
      }
    } catch (e) {
      toast.warning(
        'Error de red. Por favor, revisa tu conexión e intenta de nuevo.'
      )
    }
  }

  const onMessageReceived = async(body: any) => {
      const messageObject = JSON.parse(body);
      const newMessage : MessageProps = {
        'app_user_name': messageObject.user_name,
        'app_user_email': messageObject.user_email,
        'message_content': messageObject.message_text,
        'message_date': messageObject.message_date
      }
      setMessages(prevMessages => [...prevMessages, newMessage]);

  }

  const createNewMessage = async () => {
    try {
      const route = `/message/send/team?project_auth_key=${token_project}&team_id=${teamId}&message_content=${message}`
      const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token_user}`,
      }
      const response = await apiSendData(route, header)
      if (response.ok) {
        toast.success('Mensaje enviado correctamente.')
        setMessage('')
      } else {
        toast.error('Error al enviar mensaje.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }


  useEffect(() => {
    fetchMessages();
    rabbitSubscribeChannel('messages_team_' + teamId, onMessageReceived)

    return () => {
      if (client && client.connected) {
        rabbitUnsubscribeChannel('messages_team_' + teamId)
      }
    }
  }, []);

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
          <MessageList messages={messages}></MessageList>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="d-flex ps-3 pe-2 pt-4">
        <input
          className="form-control me-2"
          style={{ backgroundColor: '#f8f8f8', borderColor: 'white' }}
          value={message}
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
          <button onClick={createNewMessage}>
            <Send size="40" color={hover ? '#74bff6' : '#333'} />

          </button>
        </button>
      </form>

      <Toaster richColors />
    </div>
  )
}

export default Chat
