import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { userAuthStore } from '../authStore';

const wsUrl = `http://10.0.1.13:61613/stomp`;

// const client = new Client({
//   brokerURL: wsUrl,
//   connectHeaders: {
//     login: 'admin',
//     passcode: 'admin123',
//   },
//   debug: (str) => {
//     console.log(str);
//   },
//   reconnectDelay: 5000,
//   heartbeatIncoming: 4000,
//   heartbeatOutgoing: 4000,
// });

// let subscription: StompSubscription | null = null;
// const user_email = userAuthStore.getState().email


// const rabbitSubscribeChannel = async (brokerChannel: string) => {

//   const uniqueId = `sub-${brokerChannel}-${user_email}`;
//   client.onConnect = (frame) => {
//     console.log('Connected:', frame);

//     if (subscription) {
//       subscription.unsubscribe();
//       console.log('Unsubscribed from previous subscription');
//     }

//     subscription = client.subscribe('/queue/' + brokerChannel, (message: IMessage) => {
//       if (message.body) {
//         console.log('Received message:', message.body);
//       } else {
//         console.log('Received empty message');
//       }
//     },{
//       id: uniqueId
//     });
//     console.log(`Subscribed with id: ${uniqueId}`);
//   };
//   client.onStompError = (frame) => {
//     console.error('Broker reported error:', frame.headers['message']);
//     console.error('Additional details:', frame.body);
//   };
//   client.activate();
// };

// const rabbitUnsubscribeChannel = async (brokerChannel: string) => {
//   if (subscription) {
//     subscription.unsubscribe();
//     console.log('Unsubscribed from channel:', brokerChannel);
//   } else {
//     console.log('No active subscription to unsubscribe');
//   }
// };

// export { rabbitSubscribeChannel, rabbitUnsubscribeChannel, client };