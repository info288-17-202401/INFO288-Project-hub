import React from 'react';

const AcercaDe: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2 className="mb-4">Acerca de Project Hub</h2>
          <p>
            El proyecto "Project Hub" surge como una solución integral para la
            gestión de proyectos y equipos en el Instituto de Informática de la
            Universidad Austral de Chile. Con el objetivo de mejorar la
            eficiencia y la colaboración, este sistema distribuido se propone
            centralizar la información, facilitar el seguimiento de proyectos y
            equipos, y promover prácticas ágiles de trabajo.
          </p>
          <p>
            La arquitectura del sistema se basa en un modelo relacional, con
            componentes desarrollados principalmente en TypeScript para el
            frontend y Python para el backend. Esto permite una estructura
            modular y escalable, con una capa visible al usuario optimizada para
            una experiencia intuitiva y dinámica.
          </p>
          <p>
            En cuanto a las herramientas utilizadas, se opta por tecnologías de
            código abierto como NPM, Vite, Nginx y Docker, permitiendo una
            gestión eficiente de paquetes, un rápido desarrollo, un despliegue
            ágil y una alta disponibilidad del sistema.
          </p>
          <p>
            Los componentes del software están diseñados para cubrir todas las
            facetas de la gestión de proyectos y equipos, desde la interfaz de
            usuario con sus distintas páginas y componentes, hasta la lógica del
            negocio y la gestión de datos en el backend. Se destacan elementos
            como WebSocket para la comunicación en tiempo real, Controllers para
            manejar las solicitudes del cliente, y Middleware para garantizar la
            integridad y seguridad del sistema.
          </p>
          <p>
            El modelo físico y fundamental del proyecto se centra en la
            seguridad, implementando prácticas como encriptación de sesiones,
            control de acceso mediante tokens, configuración de firewall y
            políticas de seguridad de red para proteger la integridad de los
            datos y la privacidad de la información.
          </p>
          <p>
            Además, se plantean preguntas clave al cliente para entender sus
            necesidades específicas, como requisitos de sistema operativo y
            servidor, integraciones externas planificadas, necesidad de
            balanceador de carga personalizado, y requisitos de seguridad y
            privacidad.
          </p>
          <p>
            En resumen, "Project Hub" aspira a ser una solución completa y
            adaptable que mejore la gestión de proyectos y equipos, promoviendo
            la colaboración, la transparencia y la eficiencia en el Instituto de
            Informática de la Universidad Austral de Chile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;
