import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Register from './register'; // Importa el componente Register
import { userAuthStore } from './authStore'; // Importa el store global

type LoginType = {
  email: string;
  password: string;
};

type LoginProps = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState<LoginType>({
    email: '',
    password: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const setToken = userAuthStore((state) => state.setToken); // Obtén el método setToken del store
  const setTokenType = userAuthStore((state) => state.setTokenType); // Obtén el método setUserType del store

  const navigate = useNavigate();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(loginData.email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }
    try {
      const formData = new URLSearchParams();
      formData.append('username', loginData.email);
      formData.append('password', loginData.password);

      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parsea la respuesta a JSON
        setToken(responseData.access_token); // Almacena el token en el store
        setTokenType(responseData.token_type); // Almacena el tipo de token en el store
        setIsLoggedIn(true);
        navigate('/search-project');
      } else {
        console.error('Error al iniciar sesión:', response.statusText);
        setError('Credenciales inválidas. Por favor, intenta de nuevo.');
      }
    } catch (error: any) {
      console.error('Error de red:', error.message);
      setError(
        'Error de red. Por favor, revisa tu conexión e intenta de nuevo.'
      );
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
        <div>
          <h2 className="mb-4 text-center">
            ¡Te damos la bienvenida a Project Hub!
          </h2>
          <h3 className="text-center">Inicia sesión</h3>
        </div>
        {isSignUp ? (
          <Register />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleLoginChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleLoginChange}
              />
            </div>
            <div style={{ width: '100%' }}>
              <button
                type="submit"
                className="btn text-white w-100"
                style={{ backgroundColor: '#5864f2' }}
              >
                Iniciar sesión
              </button>
            </div>
            {error && <p className="mt-3 text-center text-danger">{error}</p>}
          </form>
        )}
        <p className="mt-3 text-center">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-light">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
