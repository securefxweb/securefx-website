import api from "./apiConfig";
import externalApi from "./externalApiConfig";
export const contactForm = {
	saveContactForm: async (data) => {
		const response = await api.post("/api/contact-forms", { data });
		return response.data;
	},
	newsLetter: async (data) => {
		const response = await api.post("/api/news-letters", { data });
		return response.data;
	},
};

export const saveContactForm = async ({
	name,
	email,
	mobile,
	country,
	message,
}) => {
	try {
		const formData = new FormData();
		formData.append("customer_name", name);
		formData.append("customer_email", email);
		formData.append("customer_mobile", mobile);
		formData.append("customer_country", country);
		//   formData.append('message', message);

		const response = await externalApi.post(
			"/ajaxfiles/add_inquiry.php",
			formData,
		);
		return response.data;
	} catch (error) {
		throw new Error("Failed to save contact form");
	}
};
