import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAuthStore } from '../authStore'; // Importa el store global
import { apiSendData } from '../services/apiService';
import pattern_gif from '../images/pattern_login.gif'


type LoginPageType = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [LoginPageData, setLoginPageData] = useState<LoginPageType>({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const setToken = userAuthStore((state) => state.setToken); // Obtén el método setToken del store
  const setTokenType = userAuthStore((state) => state.setTokenType); // Obtén el método setUserType del store
  const setEmail = userAuthStore((state) => state.setEmail); // Obtén el método setUsername del store
  const setUsername = userAuthStore((state) => state.setUsername); // Obtén el método setUsername del store

  const navigate = useNavigate();

  const handleLoginPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPageData({
      ...LoginPageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!LoginPageData.email || !LoginPageData.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(LoginPageData.email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }
    try {
      const formData = new URLSearchParams();
      formData.append('username', LoginPageData.email);
      formData.append('password', LoginPageData.password);

      const route = "/auth/login"
      const header = { 'Content-Type': 'application/x-www-form-urlencoded'}
      const response = await apiSendData(route, header, formData.toString())
    
      if (response.ok) {
        const responseData = await response.json(); // Parsea la respuesta a JSON
        setToken(responseData.access_token); // Almacena el token en el store
        setTokenType(responseData.token_type); // Almacena el tipo de token en el store
        setUsername(responseData.user_name); // Almacena el nombre de usuario en el store
        setEmail(LoginPageData.email);
        userAuthStore.setState({ state: true });
        navigate('/home');
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
<div className='vw-100' style={{backgroundColor: '#f9f9f9'}}>
  <div className='w-100 d-flex flex-container justify-content-center align-items-center vw-100 vh-100'>
  <section className="d-flex justify-content-center align-items-center w-100 vh-100">
  <div className="p-5 text-black bg-white rounded-lg" style={{ width: '30vw', maxWidth:'30rem', borderRadius: '10px 2%' }}>
    <div>
      <h3 className="text-left font-inter">Bienvenido!</h3>
      <h6 className="text-left nunito-sans-regular text-secondary mb-4">Ingresa tus datos para iniciar sesión</h6>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
          className="form-control"
          onChange={handleLoginPageChange}
          style={{ backgroundColor: '#f8f8f8', borderColor: 'white' }}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="form-control"
          style={{ backgroundColor: '#f8f8f8', borderColor: 'white' }}
          onChange={handleLoginPageChange}
        />
      </div>
    </form>
    <div style={{ width: '100%' }}>
      <button type="submit" className="btn text-white w-100 mt-2" style={{ backgroundColor: '#202020' }}>
        Iniciar sesión
      </button>
      <button style={{ background: 'white', border: 0 }}>
        <Link to="/register" className="text-black">
          <p>Crear cuenta</p>
        </Link>
      </button>
    </div>
    {error && <p className="mt-3 text-center text-danger">{error}</p>}
  </div>
</section>
    <section className='w-50 vh-100'>
      <img src={pattern_gif} className='vh-100' style={{ overflow: "hidden", borderRadius: '10px 2%' }}></img>
    </section>
  </div>
</div>
  );
};

export default LoginPage;
