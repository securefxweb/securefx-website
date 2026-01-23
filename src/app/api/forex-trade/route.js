import axios from "axios";
import { NextResponse } from "next/server";

const FOREX_API_BASE_URL = "https://api.forexrateapi.com/v1";
const FOREX_API_KEY = process.env.FOREX_API_KEY;

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const base = searchParams.get("base") || "USD";
		const currencies = searchParams.get("currencies") || "";

		const url = `${FOREX_API_BASE_URL}/latest`;

		const response = await axios.get(url, {
			params: {
				api_key: FOREX_API_KEY,
				base: base,
				currencies: currencies,
			},
		});

		return NextResponse.json(response.data);
	} catch (error) {
		console.error("Forex API Error:", error.response?.data || error.message);
		return NextResponse.json(
			{
				error: error.response?.data?.message || "Failed to fetch forex rates",
				success: false,
			},
			{ status: error.response?.status || 500 },
		);
	}
}
