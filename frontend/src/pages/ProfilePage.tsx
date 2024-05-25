import React from 'react'
import profileimg from '../assets/images/background_home.jpg'
import { userAuthStore } from '../authStore'

const ProfilePage: React.FC = () => {
  return (
    <div style={{ height: 'calc(100vh - 58px)', marginTop: '58px' }}>
      <div className="container-fluid p-3">
        <div className="row justify-content-center">
          <div className="col-md-12 col-sm-12 col-lg-6">
            <div className="card shadow">
              <div className="card-body">
                <div className="text-center mb-4">
                  <img
                    src={profileimg}
                    className="rounded-circle"
                    alt="Imagen de perfil"
                    width="150"
                    style={{
                      borderRadius: '50%',
                      height: '300px',
                      width: '300px',
                      objectFit: 'cover',
                      margin: '20px auto',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
