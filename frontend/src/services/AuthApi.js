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

export const checkAuthApi = async () => {
  return axios.get(`${API_URL}/auth/check-auth`,
    {withCredentials: true}
  )
}

export const logoutApi = async () => {
  return axios.post(`${API_URL}/auth/logout`,{},
    {withCredentials: true}
  )
}