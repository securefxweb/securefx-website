import api from "./apiConfig";

export const affiliateService = {
	submitAffiliateForm: async (data) => {
		const response = await api.post("/api/affiliates", { data });
		return response.data;
	},
};
