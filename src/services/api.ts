import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();
const token = cookies.access_token;

export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: { Authorization: `Bearer ${token}` },
});
