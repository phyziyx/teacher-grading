import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
	baseURL: import.meta.env.API_URL,
});

export default api;