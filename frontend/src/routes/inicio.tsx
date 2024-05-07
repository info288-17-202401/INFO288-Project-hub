// Inicio.tsx, AcercaDe.tsx, Contacto.tsx
import { Route, Routes, useNavigate } from 'react-router-dom'; // Importa useNavigate

import React, { useState } from 'react';

const Inicio: React.FC = () => {
  const [clickButton, setClickButton] = useState(false);
  const navigate = useNavigate(); // Agrega esta línea

  const onclickButton = () => {
    setClickButton(!clickButton);

    navigate('/teams'); // Agrega esta línea
  };
  return (
    <>
      <div
        className="text-light p-4 container d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh', border: 'none' }}
      >
        <div className="card p-4" style={{ border: 'none' }}>
          <h2 className="mb-4">Ingrea a un proyecto</h2>
          <label className="form-label">Token:</label>
          <form>
            <div className="mb-3">
              <input type="text" className="form-control" />
            </div>
            <button
              onClick={onclickButton}
              type="submit"
              className="btn btn-primary"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Inicio;
