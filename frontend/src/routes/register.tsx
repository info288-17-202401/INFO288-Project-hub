import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = ({}) => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password
    ) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Verificar si el correo electrónico es válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(registerData.email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: registerData.username,
          user_email: registerData.email,
          user_password: registerData.password,
        }),
      });

      if (response.ok) {
        console.log('Usuario registrado exitosamente.');
        navigate('/login'); // Redirige al componente de login
      } else {
        console.error('Error al registrar usuario:', response.statusText);
        setError(`El correo ${registerData.email} ya tiene cuenta`);
      }
    } catch (error: any) {
      console.error('Error de red:', error.message);
    }
  };

  return (
    <div
      className="text-light p-4 container d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <div
        className="card p-4  text-light"
        style={{ backgroundColor: '#303339', width: '50%' }}
      >
        <h2 className="mb-4 text-center">
          ¡Te damos la bienvenida a Project Hub!
        </h2>
        <h3 className="text-center">Crear una cuenta</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={handleRegisterChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleRegisterChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleRegisterChange}
            />
          </div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <button
              type="submit"
              className="btn text-white w-100"
              style={{ backgroundColor: '#5864f2' }}
            >
              Registrarse
            </button>
            <span
              style={{ color: 'red', display: 'block', marginTop: '0.5rem' }}
            >
              {error}
            </span>
          </div>
        </form>
        <p className="mt-3 text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-light">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
