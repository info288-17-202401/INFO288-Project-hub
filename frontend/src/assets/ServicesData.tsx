import image_2a from '../assets/images/services/2a.jpg'
import image_3a from '../assets/images/services/3a.jpg'
import image_4a from '../assets/images/services/4a.png'
import image_5a from '../assets/images/services/5a.jpg'

export interface Service {
  title: string
  description: string
  image: string
}

const services: Service[] = [
  {
    title: 'Monitoreo en Tiempo Real',
    description:
      'Monitorea y analiza el rendimiento del equipo en tiempo real.',
    image: image_5a,
  },
  {
    title: 'Herramientas Avanzadas de Seguimiento',
    description:
      'Optimiza la productividad con herramientas avanzadas de seguimiento.',
    image: image_2a,
  },
  {
    title: 'Gestión de Proyectos Integrada',
    description: 'Organiza y gestiona proyectos desde una sola plataforma',
    image: image_3a,
  },
  {
    title: 'Comunicación Fluida',
    description: 'Comunicación fluida con chat en tiempo real.',
    image: image_4a,
  },
]

export default services
