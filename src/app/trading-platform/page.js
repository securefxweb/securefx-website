import TradingPlateform from "@/rendering/tradingPlatform";
import React from "react";

export const metadata = {
	title: "Trading Platform - SecureFX",
	description: "Standard trading account with competitive spreads",
};

export default function page() {
	return (
		<div>
			<TradingPlateform />
		</div>
	);
}
