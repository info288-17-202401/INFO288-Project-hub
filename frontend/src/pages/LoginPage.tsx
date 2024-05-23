import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuthStore } from '../authStore' // Importa el store global
import { toast, Toaster } from 'sonner'
import { apiSendData } from '../services/apiService'
import { LoginProps } from '../types/types'

const LoginPage: React.FC = () => {
  const [LoginPageData, setLoginPageData] = useState<LoginProps>({
    email: '',
    password: '',
  })

  const setToken = userAuthStore((state) => state.setToken) // Obtén el método setToken del store
  const setTokenType = userAuthStore((state) => state.setTokenType) // Obtén el método setUserType del store
  const setEmail = userAuthStore((state) => state.setEmail) // Obtén el método setUsername del store
  const setUsername = userAuthStore((state) => state.setUsername) // Obtén el método setUsername del store

  const navigate = useNavigate()

  const handleLoginPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPageData({
      ...LoginPageData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!LoginPageData.email || !LoginPageData.password) {
      toast.warning('Por favor, completa todos los campos.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(LoginPageData.email)) {
      toast.warning('Por favor, introduce un correo electrónico válido.')
      return
    }

    try {
      const formData = new URLSearchParams()
      formData.append('username', LoginPageData.email)
      formData.append('password', LoginPageData.password)

      const route = `/auth/login?user_email=${LoginPageData.email}&user_password=${LoginPageData.password}`
      const header = {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      const body = formData.toString()
      const response = await apiSendData(route, header, body)
      if (response.ok) {
        const responseData = await response.json() // Parsea la respuesta a JSON
        setToken(responseData.access_token) // Almacena el token en el store
        setTokenType(responseData.token_type) // Almacena el tipo de token en el store
        setUsername(responseData.user_name) // Almacena el nombre de usuario en el store
        setEmail(LoginPageData.email)
        userAuthStore.setState({ state: true })
        toast.success('Credenciales validas. ¡Bienvenido!')

        setTimeout(() => {
          navigate('/home')
        }, 500)
      } else {
        toast.error('Credenciales inválidas. Por favor, intenta de nuevo.')
      }
    } catch (e) {
      toast.warning(
        'Error de red. Por favor, revisa tu conexión e intenta de nuevo.'
      )
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 div-login">
      <div
        className="card p-4 border-0 "
        style={{
          maxWidth: '400px',
          width: '100%',
          boxShadow: '-10px 10px 15px -3px rgba(0, 0, 0, 0.1) ',
        }}>
        <div className="text-left mb-2">
          <h2 className="font-inter" style={{ fontSize: '2rem' }}>
            ¡Bienvenido!
          </h2>
          <p className="text-secondary pt-1" style={{ fontSize: '1.1rem' }}>
            Ingresa tus datos para iniciar sesión
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Correo electrónico"
              style={{ backgroundColor: '#f8f8f8', borderColor: 'white' }}
              onChange={handleLoginPageChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              style={{ backgroundColor: '#f8f8f8', borderColor: 'white' }}
              onChange={handleLoginPageChange}
            />
          </div>
          <div style={{ width: '100%' }}>
            <button
              type="submit"
              className="btn text-white w-100"
              style={{ backgroundColor: '#202020' }}>
              Iniciar sesión
            </button>
          </div>
          <Toaster richColors />
        </form>
        <p className="mt-3 text-center text-dark">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-dark">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
