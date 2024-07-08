import React, { useEffect, useState } from 'react'
import UserCard from '../cards/UserCard'
import { getUserSession } from '../../services/login'
import { projectAuthStore } from '../../authStore'
import { apiGetData } from '../../services/apiService'
import { toast } from 'sonner'
import { UserCardProps } from '../../types/types'

type UserListProps = {
	showList: (bool: boolean) => void
}

const UserList: React.FC<UserListProps> = ({ showList }) => {
	const [users, setUsers] = useState<UserCardProps[]>([])

	useEffect(() => {
		const fetchUsers = async () => {
			const { access_token } = getUserSession()
			const { token_project } = projectAuthStore.getState()

			try {
				//const route = `/team/${team_id}/users?project_auth_key=${token_project}`
				const route = `/team/1/users?project_auth_key=${token_project}`

				const header = {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`,
				}
				const response = await apiGetData(route, header)

				if (response.ok) {
					const data = await response.json()
					setUsers(data)

					toast.success('Usuarios obtenidos exitosamente.')
				} else {
					toast.error('Error al obtener los usuarios.')
				}
			} catch {
				toast.warning(
					'Error de red. Por favor, revisa tu conexión e intenta de nuevo.'
				)
			}
		}

		fetchUsers()
	}, [])

	return (
		<div
			className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-75"
			style={{ zIndex: 9999 }}>
			<div
				className="bg-white rounded-3 p-3 mb-5 shadow-lg"
				style={{
					width: '80%',
					maxWidth: '400px',
					height: '80%',
					maxHeight: '600px',
					display: 'flex',
					flexDirection: 'column',
				}}>
				<div className="text-center mb-1">
					<h2 className="font-inter fs-3">Lista de usuarios</h2>
				</div>
				<div className="d-flex flex-column flex-grow-1 overflow-auto">
					<ul className="list-unstyled mb-0">
						{users.map((user, index) => (
							<li className="mb-3" key={index}>
								<UserCard
									app_user_name={user.app_user_name}
									app_user_email={user.app_user_email}
									user_status={user.user_status}
									colorRow={index % 2 ? '#fff' : '#f4f9ff'}
								/>
							</li>
						))}
					</ul>
				</div>
				<div className="d-flex pt-2">
					<button
						className="btn btn-dark w-100 mt-2"
						onClick={() => {
							showList(false)
						}}>
						Salir
					</button>
				</div>
			</div>
		</div>
	)
}

export default UserList
