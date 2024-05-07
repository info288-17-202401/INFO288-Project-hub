import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

type LoginType = {
  username: string;
  password: string;
};

type LoginProps = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState<LoginType>({
    username: '',
    password: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/inicio');

    /* if (!loginData.username || !loginData.password) {
      setError('Por favor ingresa tu nombre de usuario y contraseña');
      return;
    }

    try {
      const response = await fetch('./users.json');
      const users = await response.json();

      const user = users.find(
        (user: { username: string; password: string }) =>
          user.username === loginData.username &&
          user.password === loginData.password
      );

      if (user) {
        if (isSignUp) {
          // Manejo de registro
          console.log('Usuario nuevo:', loginData.username);
          console.log('Contraseña nueva:', loginData.password);
          // Lógica de registro...
        } else {
          // Manejo de inicio de sesión
          console.log('Iniciando sesión...');
          // Lógica de inicio de sesión...
          navigate('/inicio');
        }
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error al intentar iniciar sesión');
      console.error('Error:', error);
    } */
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
        <div className="">
          <h2 className="mb-4 text-center">
            {isSignUp
              ? 'Crear cuenta'
              : '¡Te damos la bienvenida a Project Hub!'}
          </h2>
          {!isSignUp && <h3 className="text-center">Inicia sesión</h3>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={dataLogin}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={dataLogin}
            />
          </div>
          <div style={{ width: '100%' }}>
            <button
              type="submit"
              className="btn text-white w-100"
              style={{ backgroundColor: '#5864f2' }}
            >
              {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </div>
          {error && <p className="mt-3 text-center text-danger">{error}</p>}
        </form>
        <p className="mt-3 text-center">
          {isSignUp ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
          <button
            type="button"
            className="btn btn-link text-light border-0"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
