import React, { useEffect, useState } from 'react'
import { userAuthStore } from '../../authStore'
import { toast, Toaster } from 'sonner'
import { apiGetData } from '../../services/apiService'
import { ProjectCardProps } from '../../types/types'
import ElementProjectTable from './ElementProjectTable'
import 'bootstrap/dist/css/bootstrap.min.css'

const ProjectTable: React.FC = () => {
  const [dataProjects, setDataProjects] = useState<ProjectCardProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const route = `/user/projects`
        const header = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAuthStore.getState().token}`,
        }
        const response = await apiGetData(route, header)
        if (response.ok) {
          toast.success('Proyectos obtenidos exitosamente.')
          const data = await response.json()
          setDataProjects(data)
        } else {
          toast.error('Error al obtener los proyectos.')
        }
      } catch (e) {
        console.error('Error:', e)
      }
    }

    fetchProjects()
  }, [])

  const indexOfLastProject = currentPage * itemsPerPage
  const indexOfFirstProject = indexOfLastProject - itemsPerPage
  const currentProjects = dataProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  )
  const totalPages = Math.ceil(dataProjects.length / itemsPerPage)

  return (
    <div className="container mt-4">
      <div
        className="card rounded-4 p-4 border-0 h-75"
        style={{
          boxShadow:
            'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          position: 'relative',
        }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold">
            Mis Proyectos ({dataProjects.length})
          </h5>
        </div>
        <div
          className="h-100"
          style={{ overflowY: 'auto', position: 'relative' }}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="text-secondary" style={{ width: '40%' }}>
                  Nombre
                </th>
                <th className="text-secondary" style={{ width: '20%' }}>
                  ID
                </th>
                <th className="text-secondary" style={{ width: '20%' }}>
                  Contraseña
                </th>
                <th
                  className="text-secondary d-none d-md-table-cell"
                  style={{ width: '20%' }}>
                  Fecha de creación
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project: ProjectCardProps) => (
                <ElementProjectTable
                  key={project.project_id}
                  name={project.project_name}
                  description={project.project_description}
                  project_id={project.project_id}
                  project_password="12345"
                  project_creation_date={project.project_creation_date}
                />
              ))}
              <Toaster richColors />
            </tbody>
          </table>
          <div
            className="pagination-wrapper"
            style={{ bottom: 0, backgroundColor: 'white', zIndex: 1 }}>
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const PaginationControl: React.FC<{
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            Anterior
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i}
            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default ProjectTable
