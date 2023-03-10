import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();
const token = cookies.access_token;

const apiUrl = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "http://localhost:8000";

export const api = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${token}` },
});
