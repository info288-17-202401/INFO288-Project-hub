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
            className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/home" className="nav-link" onClick={toggleMenu}>
                  <dt className="text-white">Inicio</dt>
                </Link>
              </li>
              <li>
                <Link
                  to="/search-project"
                  className="nav-link"
                  onClick={toggleMenu}
                >
                  <dt className="text-white">Buscar proyecto</dt>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" onClick={toggleMenu}>
                  <dt className="text-white">Acerca de</dt>
                </Link>
              </li>
            </ul>
          </div>
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
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
