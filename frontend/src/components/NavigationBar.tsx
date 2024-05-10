import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Discord from '../assets/Discord.tsx'; // Ajusta la ruta según la ubicación real del archivo SVG
import { userAuthStore } from '../authStore.tsx';

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const login = userAuthStore((state) => state.state); // Obtener el estado de autenticación del store

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const clickButton = () => {
    userAuthStore.getState().setToken('');
    userAuthStore.getState().setUsername('');
    userAuthStore.getState().setEmail('');
    userAuthStore.getState().setTokenType('');
    userAuthStore.getState().setState(false);
    //hacer fetch a la api para cerrar la session
  };

  return (
    <div style={{ background: '#404fed' }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark justify-content-center">
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarSupportedContent"
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex align-items-center">
            <Link to="/home" className="nav-link" onClick={toggleMenu}>
              <button
                className="d-flex align-items-center btn-unstyled"
                style={{ border: 'none', background: 'none' }}
              >
                <span className="me-2 text-uppercase p-2 text-white">
                  <dt>Project Hub</dt>
                </span>
                <Discord />
              </button>
            </Link>
          </div>
          <div
            className={`collapse navbar-collapse d-flex m-auto bg-primary ${
              isOpen ? 'show' : ''
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto ">
              <li className="nav-item">
                <Link to="/home" className="nav-link" onClick={toggleMenu}>
                  <dt className="text-white">Inicio</dt>
                </Link>
              </li>
              <li>
                {login ? (
                  <div className="d-flex">
                    <Link
                      to="/project-options"
                      className="nav-link"
                      onClick={toggleMenu}
                    >
                      <dt className="text-white">Opciones de proyecto</dt>
                    </Link>
                    <Link
                      to="/my-projects"
                      className="nav-link"
                      onClick={toggleMenu}
                    >
                      <dt className="text-white">Mis proyectos</dt>
                    </Link>
                  </div>
                ) : null}
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" onClick={toggleMenu}>
                  <dt className="text-white">Acerca de</dt>
                </Link>
              </li>
            </ul>
          </div>

          {!login ? (
            <Link to="/login" className="nav-link" onClick={toggleMenu}>
              <button
                className="btn-sm d-flex rounded-5 text-dark ms-2"
                style={{ border: 'none', fontSize: '0.9rem' }}
              >
                <span className="p-2">
                  <dt>Login</dt>
                </span>
              </button>
            </Link>
          ) : (
            <div className="d-flex">
              <Link to="/profile" className="nav-link" onClick={toggleMenu}>
                <button
                  className="btn-sm d-flex rounded-5 text-dark ms-2"
                  style={{ border: 'none', fontSize: '0.9rem' }}
                >
                  <span className="p-2">
                    <dt>Perfil</dt>
                  </span>
                </button>
              </Link>
              <button
                className="btn-sm d-flex rounded-5 text-dark ms-2"
                style={{
                  border: 'none',
                  fontSize: '0.9rem',
                }}
                onClick={clickButton}
              >
                <span className="p-2">
                  <dt>Cerrar session</dt>
                </span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
