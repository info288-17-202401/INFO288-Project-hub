import React from 'react';
import profileimg from '../assets/errorPage.jpg';
import { userAuthStore } from './authStore';

const Profile: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-4">
                <img
                  src={profileimg}
                  className=""
                  alt="Imagen de perfil"
                  width="150"
                />
              </div>
              <h1 className="card-title text-center">Perfil de Usuario</h1>
              <hr />
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Nombre de usuario:
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  readOnly
                  value="NombreUsuario"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  readOnly
                  value={userAuthStore.getState().email}
                />
              </div>

              <div className="text-center">
                <button className="btn btn-primary">Actualizar perfil</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
