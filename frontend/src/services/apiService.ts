const BASE_URL = `${import.meta.env.VITE_API_URL}`

export const apiSendData = async ( // Función para enviar datos al backend
  route: string,
  header: any,
  body?: string
): Promise<Response> => { // Devuelve una promesa con la respuesta
  try {
    const response = await fetch(BASE_URL + route, {
      method: 'POST',
      headers: header,
      body: body ? body : JSON.stringify({}),
    })
    return response
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}

export const apiGetData = async ( // Función para obtener datos del backend
  route: string,
  header: any
): Promise<Response> => { // Devuelve una promesa con la respuesta
  try {
    const response = await fetch(BASE_URL + route, {
      method: 'GET',
      headers: header,
    })
    return response
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}
