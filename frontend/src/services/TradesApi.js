import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getTradeHistoryApi = async () => {
  return axios.get(`${API_URL}/trade/history`,
    {withCredentials: true}
  )
}