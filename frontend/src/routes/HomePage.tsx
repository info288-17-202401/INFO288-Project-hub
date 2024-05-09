import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Bienvenido a Project Hub
              </h2>
              <p className="card-text">
                Project Hub es una plataforma que te permite encontrar y
                colaborar en proyectos emocionantes con personas de ideas afines
                en todo el mundo.
              </p>
              <p className="card-text">
                Ya sea que estés buscando un proyecto para unirte o buscando
                colaboradores para tu propia idea, estás en el lugar correcto.
              </p>
              <p className="card-text">
                ¡Regístrate ahora y comienza a explorar y contribuir a la
                comunidad de Project Hub!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
