import axios from "axios";

const externalApi = axios.create({
	baseURL:
		process.env.NEXT_PUBLIC_EXTERNAL_API_URL ||
		"https://qs3jxn86-3000.inc1.devtunnels.ms",
});

export default externalApi;
