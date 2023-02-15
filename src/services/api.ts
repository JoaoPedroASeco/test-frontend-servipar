import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();
const token = cookies.access_token;

export const api = axios.create({
  baseURL: "https://test-backend-servipar-production.up.railway.app",
  headers: { Authorization: `Bearer ${token}` },
});
