import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function doLogin(email, password) {
  const response = await axios.post(`${API_URL}/auth`, { email, password });
  return response.data;
}