import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <nav className='navbar navbar-expand-lg'
    style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      <div className='container-fluid'>
        <Link to="/home" className="nav-link" onClick={toggleMenu}>
          <button
            className="d-flex align-items-center btn-unstyled"
            style={{ border: 'none', background: 'none' }}
          >
            <span className="me-2 text-uppercase p-2 text-black">
              <dt>Project Hub</dt>
            </span>
          </button>
          </Link>
          <div className='collapse navbar-collapse'>
            <ul className="navbar-nav">

              <li>
                {login ? (
                  <div className="d-flex">
                    <Link
                      to="/project-options"
                      className="nav-link"
                      onClick={toggleMenu}
                    >
                      <dt className="text-black">Opciones de proyecto</dt>
                    </Link>
                    <Link
                      to="/my-projects"
                      className="nav-link"
                      onClick={toggleMenu}
                    >
                      <dt className="text-black">Mis proyectos</dt>
                    </Link>
                  </div>
                ) : null}
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" onClick={toggleMenu}>
                  <dt className="text-black">About</dt>
                </Link>
              </li>
            </ul>
          </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
