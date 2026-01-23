import TradingPlateforWeb from "@/rendering/tradingPlatforWeb";
import React from "react";

export const metadata = {
	title: "Trading Platform - SecureFX",
	description: "Standard trading account with competitive spreads",
};

export default function page() {
	return (
		<div>
			<TradingPlateforWeb />
		</div>
	);
}
