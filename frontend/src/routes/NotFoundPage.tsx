import React from 'react';
import errorPageImage from '../assets/errorPage.jpg';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h2 className="mb-4">¡Ups! Página no encontrada</h2>
          <p className="mb-4">
            Lo sentimos, parece que la página que estás buscando no existe.
          </p>
          <img
            src={errorPageImage}
            alt="Error 404"
            className="img-fluid mb-4"
            style={{ height: '50vh' }}
          />
          <p>
            <a href="/" className="btn btn-primary">
              Volver a la página de inicio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
