import React, { useState } from 'react'
import CreateProject from '../components/project/CreateProject'
import JoinProject from '../components/project/JoinProject'

type ProjectOptionsPageButtonProps = {
  type: string
  onClick: () => void
}

const ProjectOptionsPageButton: React.FC<ProjectOptionsPageButtonProps> = ({ // Botón para crear o unirse a un proyecto
  type,
  onClick,
}) => {
  return (
    <>
      <button
        type="submit"
        className="btn text-white w-100 mb-2"
        style={{ backgroundColor: '#202020' }}
        onClick={onClick}>
        {type}
      </button>
    </>
  )
}

const ProjectOptionsPage: React.FC = () => { // Página de opciones de proyecto
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [showJoinProject, setShowJoinProject] = useState(false)

  const handleCreateProjectClick = () => { // Maneja el evento de crear un proyecto
    setShowCreateProject(true)
    setShowJoinProject(false)
  }

  const handleJoinProjectClick = () => { // Maneja el evento de unirse a un proyecto
    setShowJoinProject(true)
    setShowCreateProject(false)
  }

  const handleReturn = () => { // Maneja el evento de regresar
    setShowCreateProject(false)
    setShowJoinProject(false)
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 vh-100"
      style={{ backgroundColor: '#f9f9f9' }}>
      {showCreateProject && <CreateProject onReturn={handleReturn} />}
      {showJoinProject && <JoinProject onReturn={handleReturn} />}
      {!showCreateProject && !showJoinProject && (
        <div
          className="card p-4 border-0 "
          style={{
            maxWidth: '450px',
            width: '100%',
            boxShadow: '10px 10px 15px -3px rgba(0, 0, 0, 0.1) ',
          }}>
          <h2
            className="font-inter text-center text-uppercase mb-4"
            style={{ fontSize: '2rem' }}>
            Seleciona una opcion
          </h2>
          <ProjectOptionsPageButton
            type="Crear un proyecto"
            onClick={handleCreateProjectClick}
          />
          <ProjectOptionsPageButton
            type="Unirse a un proyecto"
            onClick={handleJoinProjectClick}
          />
        </div>
      )}
    </div>
  )
}

export default ProjectOptionsPage
