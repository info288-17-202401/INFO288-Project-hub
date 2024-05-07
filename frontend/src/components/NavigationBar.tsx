import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import discordSVG from '../assets/discord.svg'; // Ajusta la ruta según la ubicación real del archivo SVG

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/inicio" className="nav-link" onClick={toggleMenu}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={toggleMenu}>
                Iniciar sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={toggleMenu}>
                Acerca de
              </Link>
            </li>
          </ul>
          <Link to="/inicio" className="nav-link" onClick={toggleMenu}>
            <button
              className="d-flex align-items-center btn-unstyled"
              style={{ border: 'none', background: 'none' }}
            >
              <span className="me-2 text-uppercase p-2">
                <dt>Project Hub</dt>
              </span>
              <img
                src={discordSVG}
                alt="Discord Logo"
                className="img-fluid"
                style={{ maxWidth: '40px' }}
              />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
