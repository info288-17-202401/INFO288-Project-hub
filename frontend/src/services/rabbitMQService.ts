import { Client, IMessage, StompSubscription } from '@stomp/stompjs'
import { userAuthStore } from '../authStore'

const wsUrl = `ws://${import.meta.env.VITE_BROKER_URL}/ws`

const client = new Client({
  brokerURL: wsUrl,
  connectHeaders: {
    login: import.meta.env.VITE_RABBITMQ_LOGIN,
    passcode: import.meta.env.VITE_RABBITMQ_PASSCODE,
  },
  heartbeatIncoming: 5000,
  heartbeatOutgoing: 5000,
})

const subscriptions: { [key: string]: StompSubscription } = {}
const user_email = userAuthStore.getState().email

client.onConnect = () => {
  console.log('Connected to RabbitMQ broker')
}

client.onStompError = (frame) => {
  console.error('Broker reported error:', frame.headers['message'])
  console.error('Additional details:', frame.body)
}

client.activate()

const rabbitSubscribeChannel = async (
  brokerChannel: string,
  onMessageReceived: (message: string) => void
) => {
  const uniqueId = `sub-${brokerChannel}-${user_email}`

  if (!subscriptions[uniqueId]) {
    const subscription = client.subscribe(
      '/queue/' + brokerChannel,
      (message: IMessage) => {
        if (message.body) {
          onMessageReceived(message.body)
        } else {
          console.log('Received empty message')
        }
      },
      {
        id: uniqueId,
      }
    )
    subscriptions[uniqueId] = subscription
    console.log('Subscribed to channel:', brokerChannel)
  } else {
    console.log('Already subscribed to channel:', brokerChannel)
  }
}

const rabbitUnsubscribeChannel = async (brokerChannel: string) => {
  const uniqueId = `sub-${brokerChannel}-${user_email}`
  if (subscriptions[uniqueId]) {
    subscriptions[uniqueId].unsubscribe()
    delete subscriptions[uniqueId]
    console.log('Unsubscribed from channel:', brokerChannel)
  } else {
    console.log(
      'No active subscription to unsubscribe from channel:',
      brokerChannel
    )
  }
}

export { rabbitSubscribeChannel, rabbitUnsubscribeChannel, client }
