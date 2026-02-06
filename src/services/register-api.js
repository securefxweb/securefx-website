import externalApi from "./externalApiConfig";

export const sendRegisterOTP = async (userData) => {
	try {
		const formData = new FormData();
		formData.append("user_full_name", userData.user_full_name);
		formData.append("user_email_address", userData.user_email_address);
		formData.append("user_country_code", userData.user_country_code);
		formData.append("user_phone", userData.user_phone);
		formData.append("user_password", userData.user_password);
		formData.append("action", "send_otp");

		const response = await externalApi.post(
			"/ajaxfiles/register_otp_manage.php",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error("Error sending OTP:", error);
		throw error;
	}
};

export const registerUser = async (userData) => {
	try {
		const formData = new FormData();
		formData.append("user_full_name", userData.user_full_name);
		formData.append("user_email_address", userData.user_email_address);
		formData.append("user_country_code", userData.user_country_code);
		formData.append("user_phone", userData.user_phone);
		formData.append("user_password", userData.user_password);
		formData.append("send_otp", userData.send_otp);

		const response = await externalApi.post(
			"/ajaxfiles/registration.php",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error("Error registering user:", error);
		throw error;
	}
};
