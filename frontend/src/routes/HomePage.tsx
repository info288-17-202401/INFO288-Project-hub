import React from 'react';
import team_video from '../images/team_video.mp4'
import CardService from '../components/CardService';
import image_1a from '../images/services/1a.jpg'
import image_2a from '../images/services/2a.jpg'
import image_3a from '../images/services/3a.jpg'
import image_4a from '../images/services/4a.png'
import image_5a from '../images/services/5a.jpg'
import { Link } from 'react-router-dom';



const HomePage: React.FC = () => {
  return (
    <div className='vw-100'>
    <div className=" w-100 d-flex flex-container justify-content-center 
                    align-items-center  vw-100">
          <div className=' max-w-50 min-w-75 '>
            <video className='videoTag w-100 ' autoPlay loop muted>
              <source src={team_video} type='video/mp4'></source>
            </video>
          </div>
        <div className='w-25 max-vw-50 '>
          <div className='w-100 align-items-center justify-content-center'>
              <p className='border d-inline-flex rounded-pill text-black'> 
                <strong className='mx-3 my-2 '>hey!...</strong>
              </p>
          
              <h1 className='font-inter' style={{ fontSize: '54px',  lineHeight: '1'  }}>
                <strong>
                  Gestiona de manera <span className='text-white mx-2' style={{ backgroundColor: '#74bff6'  }}> eficaz </span> tus projectos
                </strong>
              </h1>
              <p className='text-black-50 roboto-light'>
                Project Hub es una plataforma que te permite encontrar y
                colaborar en proyectos emocionantes con personas de ideas afines
                en todo el mundo.
              </p>
              <Link to="/login" className="nav-link" >
              <button className='border rounded-pill text-white bg-black d-inline-flex nunito-sans-regular'>
                <strong className='mx-3 my-2'>Comienza Ahora</strong>
              </button>
              </Link>
          </div>
        </div>
       
    </div>
     <section className='bg-black vw-100'>
      <div >
      <h2 className='p-2 roboto-light text-white'> Servicios</h2>
      <div className='d-flex flex-container justify-content-center ' >
        <CardService
          description='Monitorea y analiza el rendimiento del equipo en tiempo real.'
          image={image_5a}>
        </CardService>
        <CardService
          description='Optimiza la productividad con herramientas avanzadas de seguimiento.'
          image={image_2a}>
        </CardService>
        <CardService
          description='Organiza y gestiona proyectos desde una sola plataforma'
          image={image_3a}>
        </CardService>
        <CardService
          description='Comunicación fluida con chat en tiempo real.'
          image={image_4a}>
        </CardService>
        </div>
      </div>
    </section>
 </div>
  );
};

export default HomePage;
