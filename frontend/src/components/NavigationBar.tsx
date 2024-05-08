import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Discord from '../assets/Discord.tsx'; // Ajusta la ruta según la ubicación real del archivo SVG

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ background: '#404fed' }}>
      <div className="container">
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ margin: '0 auto' }}
        >
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
          <div
            className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
            id="navbarSupportedContent"
          >
            <Link to="/inicio" className="nav-link" onClick={toggleMenu}>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-auto">
              <li className="nav-item">
                <Link to="/inicio" className="nav-link" onClick={toggleMenu}>
                  <dt className="text-white">Inicio</dt>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/about" className="nav-link" onClick={toggleMenu}>
                  <dt className="text-white">Acerca de</dt>
                </Link>
              </li>
            </ul>
            <div className="">
              <Link to="/login" className="nav-link" onClick={toggleMenu}>
                <button
                  className="btn-sm d-flex rounded-5 text-dark"
                  style={{ border: 'none', fontSize: '0.9rem' }}
                >
                  <span className="p-2">
                    <dt>Login</dt>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
