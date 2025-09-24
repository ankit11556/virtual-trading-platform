import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const registerApi = async (data) => {
  return axios.post(`${API_URL}/auth/register`,data
  )}

  export const loginApi = async (data) => {
  return axios.post(`${API_URL}/auth/login`,data,
    {withCredentials: true}
  )
}