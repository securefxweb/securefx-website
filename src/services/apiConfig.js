import axios from "axios";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const api = axios.create({
	baseURL: API_BASE_URL,
});
export default api;
