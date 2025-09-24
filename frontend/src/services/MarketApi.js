import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getMargetPriceApi = async (selectedSymbol) => {
  return axios.get(`${API_URL}/market?symbol=${selectedSymbol}`, 
    { withCredentials: true }
  );
}