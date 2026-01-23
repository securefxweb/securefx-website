// Generic API submission handler
const submitToAPI = async (type, data, successMessage) => {
	try {
		const response = await fetch("/api/send-email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ type, data }),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return {
				success: false,
				message:
					errorData.message || `Failed to submit ${type.replace(/_/g, " ")}`,
			};
		}

		return { success: true, message: successMessage };
	} catch (error) {
		console.error(`${type} submission error:`, error);
		return {
			success: false,
			message: error.message || "Network error occurred. Please try again.",
		};
	}
};

// Newsletter subscription function
export const subscribeNewsletter = (email) =>
	submitToAPI("newsletter", { email }, "Newsletter subscription successful");

// Contact form submission function
export const submitContactForm = (formData) =>
	submitToAPI(
		"contact_form",
		{
			fullname: formData.fullname,
			email: formData.email,
			phonenumber: formData.phonenumber,
			message: formData.message,
		},
		"Contact form submitted successfully",
	);

// Demo account form submission function
export const submitDemoAccountForm = (formData) =>
	submitToAPI(
		"try_demo_account",
		{
			prefix: formData.prefix,
			fullname: formData.name,
			email: formData.email,
			countrycode: "",
			phonenumber: formData.telephone,
		},
		"Demo account request submitted successfully!",
	);

// Live account form submission function
export const submitLiveAccountForm = (formData) =>
	submitToAPI(
		"open_live_account",
		{
			prefix: formData.prefix,
			fullname: formData.name,
			email: formData.email,
			password: formData.password,
			countrycode: "",
			phonenumber: formData.telephone,
		},
		"Live account request submitted successfully!",
	);
