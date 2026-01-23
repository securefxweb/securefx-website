import axios from "axios";

export const getForexPricing = async (base = "USD", currencies = "") => {
	try {
		const response = await axios.get("/api/forex-trade", {
			params: {
				base: base,
				currencies: currencies,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Forex API Error:", error.response?.data || error.message);
		throw new Error(
			error.response?.data?.error || "Failed to fetch forex rates",
		);
	}
};

// export const getForexChange = async (base = 'USD', startDate = '2025-12-31', endDate = '2026-01-01', currencies = '') => {
//   const url = `${FOREX_API_BASE_URL}/change`;

//   try {
//     const response = await axios.get(url, {
//       params: {
//         api_key: FOREX_API_KEY,
//         base: base,
//         start_date: startDate,
//         end_date: endDate,
//         currencies: currencies
//       }
//     });

//     const data = response.data;
//     const percentageChanges = {};

//     // Calculate percentage change: ((end_rate - start_rate) / start_rate) * 100
//     if (data.start_rate && data.end_rate) {
//       Object.keys(data.end_rate).forEach(currency => {
//         const startRate = data.start_rate[currency];
//         const endRate = data.end_rate[currency];

//         if (startRate && endRate) {
//           const percentageChange = ((endRate - startRate) / startRate) * 100;
//           percentageChanges[currency] = parseFloat(percentageChange.toFixed(2));
//         }
//       });
//     }

//     return {
//       ...data,
//       percentageChanges
//     };
//   } catch (error) {
//     console.error('Forex Change API Error:', error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || 'Failed to fetch forex change data');
//   }
// };
