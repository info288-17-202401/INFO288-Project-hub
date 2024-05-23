import React from 'react'
import { projectAuthStore, userAuthStore } from '../../authStore'
import { toast } from 'sonner'
import { apiSendData } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'
import img1 from '../../assets/images/maganment_login.gif'
import Copy from '../../assets/Copy'

type ElementProjectTableProps = {
  name: string
  description: string
  project_id: string

  project_password: string
}

const ElementProjectTable: React.FC<ElementProjectTableProps> = ({
  name,
  description,
  project_id,

  project_password,
}) => {
  const setToken = projectAuthStore((state) => state.setToken)
  const setTokenType = projectAuthStore((state) => state.setTokenType)
  const navigate = useNavigate()

  const clickCard = async () => {
    try {
      const route = `/project/auth?project_id=${project_id}&project_password=${project_password}`
      const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userAuthStore.getState().token}`,
      }
      const response = await apiSendData(route, header)
      const data = await response.json()
      if (response.ok) {
        setToken(data.access_token)
        setTokenType(data.token_type)
        toast.success('Credenciales exitosas!.')
        navigate('/projects')
      } else {
        toast.error('Credenciales inválidas. Por favor, intenta de nuevo.')
      }
    } catch (e) {
      toast.warning(
        'Error de red. Por favor, revisa tu conexión e intenta de nuevo.'
      )
    }
  }

  const copyClick = (e: React.MouseEvent<HTMLTableDataCellElement>) => {
    if (e.currentTarget.getAttribute('data-type') === 'password') {
      toast.info('Contraseña copiada!')
    } else {
      toast.info('ID copiada!')
    }
    navigator.clipboard.writeText(e.currentTarget.textContent || '')
  }

  type TdCopyOptionProps = {
    type: string
    content: string
  }

  const TdCopyOption: React.FC<TdCopyOptionProps> = ({ type, content }) => {
    const [hover, SetHover] = React.useState(false)

    return (
      <td className="align-content-center" onClick={copyClick} data-type={type}>
        <div
          className="d-flex align-items-center justify-content-between border-1 rounded-5 p-1 px-2"
          style={{
            backgroundColor: '#f6f8fa',
            cursor: 'pointer',
            color: '#333',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#a1a5a7'
            SetHover(true)
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = '#333'
            SetHover(false)
          }}>
          <p className="m-0 text-center ">{content}</p>
          <Copy color={hover ? '#a1a5a7' : '#333'} size="20" />
        </div>
      </td>
    )
  }

  return (
    <tr className="">
      <td className="d-flex align-items-center ">
        <img
          src={img1}
          onMouseOver={(e) => {
            e.currentTarget.style.border = '2px solid #007bff'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.border = 'none'
          }}
          onClick={clickCard}
          style={{
            borderRadius: '50%',
            height: '50px',
            width: '50px',
            objectFit: 'cover',
            cursor: 'pointer',
            marginRight: '10px',
            transition: 'border 0.3s ease',
          }}
          className="img-fluid"
          alt="Project"
        />
        <div>
          <p className="fw-bold m-0 p-0">{name}</p>
          <p className="m-0 p-0 d-none d-md-table-cell">
            {description.length < 41
              ? description
              : description.slice(0, 47) + '...'}
          </p>
        </div>
      </td>
      <TdCopyOption type="id" content={project_id} />
      <TdCopyOption type="password" content={project_password} />

      <td className="align-content-center d-none d-md-table-cell">Fecha</td>
    </tr>
  )
}

export default ElementProjectTable
