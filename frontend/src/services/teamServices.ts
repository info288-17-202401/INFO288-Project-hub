import { toast } from "sonner"
import { projectAuthStore, userAuthStore } from "../authStore"
import { apiGetData } from "./apiService"

export const fetchTeams = async () => { // Función para obtener los equipos de un proyecto desde el backend
    const token_project = projectAuthStore.getState().token
    const token_user = userAuthStore.getState().token
    try {
      const route = `/project/${token_project}/teams`
      const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token_user}`,
      }
      const response = await apiGetData(route, header)

      if (response.ok) { // Si la respuesta es exitosa, muestra un mensaje de éxito y devuelve los datos
        console.log(token_project)
        setTimeout(async () => {
          toast.success('Equipos obtenidos exitosamente.')
        }, 700)
        const data = await response.json()
        return data
      } else {
        toast.error('Error al obtener los equipos.')
      }
    } catch (e) {
      console.error('Error:', e)
    }
  }