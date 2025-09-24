import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getAnalyticsApi = async () => {
  return axios.get(`${API_URL}/analytics`,
    {withCredentials: true}
  )
}